import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, filter, tap, map } from "rxjs/operators";
import { Events } from "@ionic/angular";
import { AlertService } from '../alert/alert.service';
import { centralizacionUrl } from '../../../assets/config/config';
import { gnconex } from '../../models/gn/gnconex';

@Injectable({
  providedIn: "root"
})
export class HttpManagerService {
  baseUrl: string="http://132.147.157.140/rsevserv/api";
  centralizacionUrl:string;
  private httpOptions: {
    headers: HttpHeaders;
  };
  strToken = "";
  constructor(private _http: HttpClient, private _events: Events,private _alert:AlertService) {
  }

  Get<T>(urlController: string, strToken?: string) {
    let gnconex:gnconex= JSON.parse(localStorage.getItem('GnConex'));
     this.baseUrl = gnconex.CNX_IPSR;
    console.log(strToken);
    const headerAnonimous = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    const headerAuth = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      Authorization: strToken
    };

    let headers = new HttpHeaders();
    if (strToken) {
      headers = new HttpHeaders(headerAuth);
    } else {
      headers = new HttpHeaders(headerAnonimous);
    }

    let options: any = {
      headers: headers,
      observe: "body"
    };

    let url = `${this.baseUrl}${urlController}`;
    console.log(options);
    console.log(url);
    return this._http.get<T>(url, <object>options).pipe(
      tap(resp=>{
        retry(3), // reintenta la petición 3 veces
        console.log(resp);       
      }), catchError(err => this.handleError(err)) // then handle the error
      
     
    );

    // return call;
  }



  Post<T>(urlController: string, body?: any, strToken?: string) {
    let gnconex:gnconex= JSON.parse(localStorage.getItem('GnConex'));
    this.baseUrl = gnconex.CNX_IPSR;
    const headerAnonimous = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    const headerAuth = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      Authorization: strToken
    };
    let headers = new HttpHeaders();
    if (strToken) {
      headers = new HttpHeaders(headerAuth);
    } else {
      headers = new HttpHeaders(headerAnonimous);
    }
    let options: any = {
      headers: headers,
      observe: "body"
    };
    console.log(`${this.baseUrl}${urlController}`);
    console.log(body);
    return this._http
      .post<T>(`${this.baseUrl}${urlController}`, body, <object>options)
      .pipe(
        tap(resp=>{
          retry(3);
          console.log(resp);          
        })
        ,catchError(err => this.handleError(err))
     );
  }


  GetCentralizacion<T>(urlController: string) {   
    const headerAnonimous = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    let headers = new HttpHeaders(headerAnonimous); 
    let options: any = {
      headers: headers,
      observe: "body"
    };

    let url = `${centralizacionUrl}${urlController}`;
    console.log(options);
    console.log(url);
    return this._http.get<T>(url, <object>options).pipe(
      tap(resp=>{
        retry(3), // reintenta la petición 3 veces
        console.log(resp);       
      }), catchError(err => this.handleError(err)) // then handle the error
       
     
    );

    // return call;
  }


  private handleError(error: HttpErrorResponse) {
    console.log('entra a error');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("Ocurrió un error:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );

      if (error.status == 401) {
        console.log('saliendo...');
        this._events.publish("user:logOut");
        this._alert.showAlert('Acceso no autorizado','Autenticación no válida con el servicio. Ingrese nuevamente')
      }else {
        this._alert.showAlert('Error de conexión',`Código de error: ${error.status}`);
      }

    }
    // return an observable with a user-facing error message
    return throwError(
      "Ocurrió un error inesperado.Inténtelo nuevamente más tarde"
    );
  }
}
