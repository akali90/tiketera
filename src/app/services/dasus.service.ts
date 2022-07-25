import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DasusService {

  private env = environment ;
  public apiUrl: string = this.env.apiurl;

  constructor( private http: HttpClient ) { }

  saveUs(model:any []) {
    return this.http.post(this.apiUrl + 'dasus/SaveUs', model)
  }

  selUs() {
    return this.http.get( this.apiUrl + '' )
  }

}
