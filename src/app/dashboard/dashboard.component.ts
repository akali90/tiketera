import { Component, ElementRef, EventEmitter, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularInputFocusModule } from 'angular-input-focus';
import { Subscription } from 'rxjs';
import { DasusService } from '../services/dasus.service';
import { TiketsService } from '../services/tikets.service';
import { TokengenerateService } from '../services/tokengenerate.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  public finit: any = '';
  public fina:  any = '';

  // @ViewChild('name_user') name_user: ElementRef | undefined;
  // @ViewChild('cant_tiket') cant_tiket: ElementRef | undefined;

  // @ViewChild('SearchProd', { static: false }) input: any;
  public _show_action: boolean = false;

  public _set_date: any = '';
  public _step_color_bgA: string = '#18D09E';
  public _step_color_bgB: string = 'white';
  public _step_color_bgC: string = 'white';

  public _color_step_textA: string = 'whitesmoke'
  public _color_step_textB: string = '#444'
  public _color_step_textC: string = '#444'

  public _cod_asign: string = '';
  public _contad_asign: string = '0000';

  public _asunto_user:  string = '';
  public _name_user:  string = '';
  public _name_tiket: string = '';

  public _scaleA: string = 'scale(1.2)';
  public _scaleB: string = 'scale(0.8)';
  public _scaleC: string = 'scale(0.8)';

  public _show_cant:  boolean = false;
  public _show_asunto: boolean = true;
  public _show_gen: boolean = false;

  public _creador: string = '';

  public _number_tikets: string = '';

  public cant_tik_gen: number = 0;

  //datamodels
  public arrDataTikets: any = [];
  public _descripcion_hist: string = '';

  public _name_search: string = '';
  public filterSel: string = '';
  public tipfilterSel: string = '';
  public se: string = '';
  public search: boolean = true;

  constructor(private das: DasusService, private render: Renderer2, private _formBuilder: FormBuilder, private tikets: TiketsService, private token: TokengenerateService) { }


  public tiketsSubscribe: any;
  ngOnInit(): void {
    this.getTikets('cod_user', '-', 'x', 'fec_ing', 'desc');
    let xname: any  = localStorage.getItem('name_user_tiket');
    if( xname == undefined ) {
      return
    } else {
      this._name_user = xname;
      let xasunto: any  = localStorage.getItem('asunto_user_tiket');
      this._asunto_user = xasunto;
      let xcantTiket: any  = localStorage.getItem('_number_tikets');
      this._number_tikets = xcantTiket;
      this._contad_asign = this._number_tikets.padStart(4,'0');
      this._cod_asign = xasunto.toString().toUpperCase().slice(0,3);
      let xdate_tiket: any  = localStorage.getItem('date_tiket');
      this._set_date = xdate_tiket;
    }

  }



  cleanData() {
    this._cod_asign = '';
    this._number_tikets = '';
    this._asunto_user = '';
    this._name_user = '';
    this._set_date = '';
    this._contad_asign= '0000';
    localStorage.removeItem('asunto_user_tiket');
    localStorage.removeItem('name_user_tiket');
    localStorage.removeItem('date_tiket');
    localStorage.removeItem('_number_tikets');
  }

  dataPersist = (name_data:string, data: string) => localStorage.setItem(name_data, data);

  setFocus(ids: string) {
    setTimeout(() => {
        let x = document.getElementById(ids) as HTMLInputElement;
        console.log(x)
        x.focus();
      }, 500);
  }

  changeStyle(_step_color_bgA: string, _step_color_bgB: string, _step_color_bgC: string, _scaleA: string, _scaleB:string, _scaleC:string
              , _color_step_textA:string, _color_step_textB:string, _color_step_textC:string, _show_asunto:boolean, _show_cant:boolean, _show_gen:boolean) {
    this._step_color_bgA = _step_color_bgA;
    this._step_color_bgB = _step_color_bgB;
    this._step_color_bgC = _step_color_bgC;
    this._scaleA = _scaleA;
    this._scaleB = _scaleB;
    this._scaleC = _scaleC;
    this._color_step_textA = _color_step_textA;
    this._color_step_textB = _color_step_textB;
    this._color_step_textC = _color_step_textC;
    this._show_asunto = _show_asunto;
    this._show_cant = _show_cant;
    this._show_gen = _show_gen;
  }

  //REVISION POR FALTA DE TIEMPO
  // validate(nameStorage:string, alert_head: string, alert_body:string, alert_icon:any) {
  //   let xname : any = localStorage.getItem(nameStorage);
  //       if( xname == '' || xname == undefined || xname == '0' ) {
  //         Swal.fire(
  //           alert_head,
  //           alert_body,
  //           alert_icon
  //         )
  //         // console.log(opt)
  //         return;
  //       }
  // }


  nextStep(a:number) {

    switch(a) {
      case 1:
        this.changeStyle('#18D09E', 'white', 'white', 'scale(1.2)', 'scale(0.9)', 'scale(0.9)', 'white', '#444', '#444', true, false, false);
        break;
      case 2:
        let xname : any = localStorage.getItem('asunto_user_tiket');
        if( xname == '' || xname == undefined ) {
          Swal.fire(
            '¿Te olvidaste del nombre?',
            'No podemos continuar, registra un asunto',
            'question'
            )
            return;
          }
          // this.validate('asunto_user_tiket','¿Te olvidaste del nombre?', 'No podemos continuar, registra un nombre', 'question');
          this.changeStyle('white', '#18D09E', 'white', 'scale(0.9)', 'scale(1.2)', 'scale(0.9)', '#444', 'white', '#444', false, true, false);
          this.setFocus('cant_tiket')
          break;
      case 3:
        let xcant : any = localStorage.getItem('_number_tikets');
        if( Number(xcant) == 0 || xcant == undefined ) {
          Swal.fire(
            '¿Te olvidaste de ingresar la cantidad?',
            'No podemos continuar, ingresa una cantidad de tikets a crear no mayor a 99999',
            'question'
          )
          return;
        }
        // this.validate('_number_tikets','', '', 'question');
        this.changeStyle('white', 'white', '#18D09E', 'scale(0.9)', 'scale(0.9)', 'scale(1.2)', '#444', '#444', 'white', false, false, true);
        this.setFocus('user_tiket');
        this._set_date = (new Date().getDay()).toString().padStart(1,'0') + '-' + (new Date().getMonth()).toString().padStart(1,'0') + '-' + new Date().getFullYear();
        this.dataPersist('date_tiket', this._set_date);
        break;
    }

  }

  public arrUser: any = [];
  saveDus = (model: any []) => this.das.saveUs(model).subscribe( x => { console.log('Se ha guardado el usuario exitosamente') }, error => { Swal.fire('Error!', 'No hemos podido guardar el usuario E(#101).', 'error') } )

  saveTikets() {

    let xuser : any = localStorage.getItem('name_user_tiket');
        if( xuser == '' || xuser == undefined ) {
          Swal.fire(
            '¿Te olvidaste de ingresar un usuario?',
            'No podemos continuar, ingresa un usuario',
            'question'
          )
          return;
        }

    const xcodec_user = this.genCodecUser(this._name_user);

    this.arrDataTikets = {
      cod_tiket   : this._cod_asign,
      cant_tiket  : this._number_tikets,
      asunto_tiket: this._asunto_user,
      descri_tiket: '',
      cod_user    : xcodec_user
    }

    this.arrUser = {
      st_user:  this._name_user,
      cod_user: xcodec_user
    }

    console.log(this.arrDataTikets);
    console.log(this.arrUser);
    this.saveDus(this.arrUser);

    this.tikets.saveTikets(this.arrDataTikets).subscribe({
      next: () => {
        Swal.fire(
          'Generado!',
          'Tus tickets están generados.',
          'success'
        )
      }, error: () => {
        Swal.fire(
          'Error!',
          'No hemos podido generarlos E(#100).',
          'error'
        )
      }, complete: () => {
        this.getTikets('cod_user', '-', 'x','fec_ing', 'desc');
        this.cleanData();
      }
    })

  }

  //codt: string, cantt: string, asunt: string, codus: string
  putTicket( codt: string, idCantTicket: string, idAsuntoTicket: string, idDescripTicket: string, codus: string ) {
    // console.log(id)
    let xDescrip = document.getElementById(idDescripTicket) as HTMLInputElement;
    let xCant = document.getElementById(idCantTicket) as HTMLInputElement;
    let xasunto = document.getElementById(idAsuntoTicket) as HTMLInputElement;
    // console.log(xtarea.value);

    this.arrDataTikets = {
      cod_tiket   : codt.trim(),
      cant_tiket  : xCant.value.trim(),
      asunto_tiket: xasunto.value.trim(),
      descri_tiket: xDescrip.value.trim(),
      cod_user    : codus.trim()
    }

    console.log(this.arrDataTikets);

    this.tikets.putTikets(codt, codus, this.arrDataTikets).subscribe( {
      next: () => {
        Swal.fire(
          'Genial!',
          'Editado con éxito.',
          'success'
        )
      }, error: () => {
        Swal.fire(
          'Editado!',
          'No hemos podido editarlo E(#102).',
          'error'
        )
      }, complete: () => {
        this.getTikets('cod_user', '-', 'x', 'fec_ing', 'desc');
      }
    })
  }

  public tokenUser: string = '';
  genCodecUser(xuser: string) {
    this.tokenUser = xuser.slice(0,4).replace(' ', 'E') + this.token.generateRandomString(20) + '-' + new Date().getFullYear();
    return this.tokenUser;
  }

  public xtiketArr: any = [];
  getTikets(param:string, data:string, tpar:string, ordercamp:string, order: string) {

    console.log(param + '-' + data + '-' + tpar + '-' + ordercamp + '-' + order);

    if( data == '' ) {
      this.getTikets('cod_user', '-', 'x', 'fec_ing', 'desc');
    }

    else {
      this.tikets.getTikets(param, data, tpar, ordercamp, order).subscribe(
        x => {
          this.xtiketArr = x;
          this.cant_tik_gen = this.xtiketArr.length;
          console.log(this.xtiketArr);
        }
      )
    }
  }

  delTik(ctik: string, codus:string) {

    Swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tikets.DelTikets(ctik, codus).subscribe({
          next: () => {
            Swal.fire(
              'Fila Borrada!',
              'La fila se ha borrado existosamente',
              'success'
            )
          }, error: () => {
              Swal.fire(
                'Oops!',
                'Esta fila no se ha podido borrar E(104).',
                'error'
              )
          }, complete: () => {
            this.getTikets('cod_user', '-', 'x', 'fec_ing', 'desc');
          }

        }
        )
      }
    })


  }

  rangeDate( finit: any, fina: any ) {

    // Esto es netamente para produccion
    let sFinit = finit.toString().slice(0,10).replace(/-/g,'');
    let sFinal = fina.toString().slice(0,10).replace(/-/g,'');
    console.log(sFinit);
    console.log(sFinal);

    this.tikets.getRange(sFinit, sFinal).subscribe( x => {
      this.xtiketArr = x;
      this.cant_tik_gen = this.xtiketArr.length;
      console.log(this.xtiketArr);
    } )
  }

  generateCodec() {
    Swal.fire({
      title: `Generar ${this._contad_asign} tickets, a nombre de ${this._name_user} `,
      text: "Si estas seguro, adelante creémoslas!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear!',
      cancelButtonText: 'cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.saveTikets()
        this.nextStep(1)
      }
    })
  }

  prueba() {
    Swal.fire({
      title: 'Estamos a prueba!',
      text: 'Si llegaste hasta aquí comunicate al correo andrenimacion@gmail.com, para conocer nuestras nuevas actualizaciones.',
      imageUrl: '../../assets/test.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  ngOnDestroy() {
    this.tiketsSubscribe.unsubscribe();
  }

}
