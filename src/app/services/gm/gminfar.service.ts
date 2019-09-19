import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { gminfar } from 'src/app/models/gm/gminfar';

@Injectable({
  providedIn: 'root'
})
export class GminfarService {

  constructor(private _http:HttpManagerService) { }


  SetGmInfar(inscription:gminfar){
    return this._http.Post<transaction>('/GmInfar',inscription)
  }
  GetGmInfar(user:TOAccess){
    return this._http.Get<transaction>(`/GmInfar?cli_coda=${user.objResult.cli_coda}&`);
  }
}
