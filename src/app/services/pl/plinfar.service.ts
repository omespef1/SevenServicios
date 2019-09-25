import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { plinfar } from '../../models/pl/plinfar';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class PlinfarService {

  constructor(private _http:HttpManagerService) {

   }


   SetPlInfar(plinfar:plinfar,user:TOAccess){
     return this._http.Post<transaction>('/plinfar',plinfar,user.strToken);
   }
}
