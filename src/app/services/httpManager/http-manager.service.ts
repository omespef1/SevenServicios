import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { ToTransaction } from "../../models/general/totransaction";

@Injectable({
  providedIn: "root"
})
export class HttpManagerService {
  baseUrl: string ="http://localhost:52471/api";

  constructor(private _http: HttpClient) {}

  Get(urlController: string) {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };

    let bodyRequest: any = {
      headers: new HttpHeaders(headerDict)     
    };

    return this._http.get<ToTransaction>(
      `${this.baseUrl}${urlController}?emp_codi=1`   
    )    
    .pipe(
      retry(3), // reintenta la petición 3 veces
      catchError(this.handleError) // then handle the error
    );

   // return call;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}