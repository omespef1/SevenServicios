import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { gminfar } from 'src/app/models/gm/gminfar';
import { SessionsService } from '../sessions/sessions.service';


@Injectable({
  providedIn: 'root'
})
export class GminfarService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }


  SetGmInfar(inscription:gminfar,user:TOAccess){
    return this._http.Post<transaction>('/GmInfar',inscription)
  }
  GetGmInfar(user:TOAccess){
    return this._http.Get<transaction>(`/GmInfar?cli_coda=${user.objResult.cli_coda}&emp_codi=${this._sesion.GetGnEmpre().emp_codi}`);
  }
}
