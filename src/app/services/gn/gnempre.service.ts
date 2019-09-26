import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class GnempreService {

  constructor(private _http:HttpManagerService) {

   }

   GetGnEmpre(){
     return this._http.Get<transaction>('/GnEmpre?');
   }
}
