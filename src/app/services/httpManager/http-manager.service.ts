import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, filter } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class HttpManagerService {
  baseUrl: string = "http://localhost:52471/api";
  private httpOptions: {
    headers: HttpHeaders
};
strToken ="";
  constructor(private _http: HttpClient) {}

   Get<T>(urlController: string,strToken:any) {     
     console.log(strToken)    ;
          const headerDict = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Authorization": strToken
          };
      
          let options:any = {
            headers: new HttpHeaders(headerDict),
            observe: 'body'
          
          };
      
          return this._http
            .get<T>(`${this.baseUrl}${urlController}?emp_codi=1`,<object>options)
            .pipe(
              retry(3), // reintenta la petición 3 veces
              catchError(err => this.handleError(err)) // then handle the error                          
            );
       


    // return call;
  }

  Post<T>(urlController: string, body: any) {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    let bodyRequest: any = {
      headers: new HttpHeaders(headerDict)
    };
    console.log(`${this.baseUrl}${urlController}`);
    console.log(body);
    return this._http.post<T>(`${this.baseUrl}${urlController}`,body,<object>bodyRequest).pipe(     
      catchError(err => this.handleError(err))
    );
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
    }
    // return an observable with a user-facing error message
    return throwError("Ocurrió un error inesperado.Inténtelo nuevamente más tarde");
  }
}
