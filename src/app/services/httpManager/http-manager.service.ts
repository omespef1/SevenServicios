import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, filter } from "rxjs/operators";
import { Events } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class HttpManagerService {
  baseUrl: string = "http://localhost/rsevserv/api";
  private httpOptions: {
    headers: HttpHeaders;
  };
  strToken = "";
  constructor(private _http: HttpClient, private _events: Events) {}

  Get<T>(urlController: string, strToken?: string) {
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

    let url = `${this.baseUrl}${urlController}emp_codi=1`;
    console.log(options);
    console.log(url);
    return this._http.get<T>(url, <object>options).pipe(
      // retry(1), // reintenta la petición 3 veces
      catchError(err => this.handleError(err)) // then handle the error
    );

    // return call;
  }

  Post<T>(urlController: string, body: any, strToken?: string) {
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
      .pipe(catchError(err => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
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
        this._events.publish("user:logOut");
        return throwError(
          "Su sesión ha caducado, o no se encuentra autorizado para realizar ingresar a la apliación."
        );
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      "Ocurrió un error inesperado.Inténtelo nuevamente más tarde"
    );
  }
}
