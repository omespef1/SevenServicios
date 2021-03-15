import { Injectable } from '@angular/core';
import { loginRequest } from 'src/app/models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { TOAccess } from '../../models/general/totransaction';
import { tap } from 'rxjs/operators';
import { gnconex } from 'src/app/models/gn/gnconex';
import { gnempre } from 'src/app/models/gn/gnempre';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private _http: HttpManagerService) { }


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

  SetGnConex(business: gnconex) {
    localStorage.setItem('GnConex', JSON.stringify(business));
  }

  GetGnConex() {
   return JSON.parse(localStorage.getItem('GnConex'));
  }

  SetGnEmpre(business: gnempre) {
    localStorage.setItem('GnEmpre', JSON.stringify(business));
  }

  GetGnEmpre(): gnempre {
    return JSON.parse(localStorage.getItem('GnEmpre'));
  }



  erraseStorage() {
    localStorage.removeItem('GnEmpre')
    localStorage.removeItem('GnConex')
    localStorage.removeItem('user');
    localStorage.removeItem("developerMode");
  }
}
