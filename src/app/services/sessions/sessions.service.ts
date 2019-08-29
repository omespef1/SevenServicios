import { Injectable } from '@angular/core';
import { loginRequest } from 'src/app/models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { TOAccess } from '../../models/general/totransaction';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private _http:HttpManagerService) { }


  signIn(credentials: loginRequest) {   
    return this._http.Post<TOAccess>("/login/authenticate", credentials).pipe(
      tap(async (userData: TOAccess) => {
        if (userData) {        
          if (userData.codeResult === 0) {
           return userData
          }
        }
      })
    );
  }
}
