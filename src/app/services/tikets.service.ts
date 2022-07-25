import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TiketsService {

  private env = environment ;
  public apiUrl: string = this.env.apiurl;

  constructor( private http: HttpClient ) { }

  saveTikets( model: any [] ) {
    return this.http.post(this.apiUrl+'tikets/SaveTikets', model);
  }

  getTikets(param: string, data:string, tipar:string, ordercamp:string, order:string) {
    return this.http.get( this.apiUrl+'tikets/SelTikets/'+param+'/'+data+'/'+tipar+'/'+ordercamp+'/'+order);
  }

  DelTikets(ctik: string, codus:string) {
    return this.http.get( this.apiUrl+'tikets/DelTikets/'+ctik+'/'+codus);
  }

  putTikets( codt: string, codus: string, model: any [] ) {
    return this.http.put(this.apiUrl + 'tikets/PutTikets/' + codt + '/' + codus, model);
  }

  getRange( finit: any, final: any ) {
    return this.http.get( this.apiUrl+'tikets/TiketsRange/'+finit+'/'+final);
  }

}
