import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { TOAccess } from 'src/app/models/general/totransaction';

@Injectable({
  providedIn: 'root'
})
export class SuafiliService {

  
  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetSuAfili(user:TOAccess){
    return this._http.Get<transaction>(`/suafili?cli_coda=${user.objResult.cli_coda}&emp_codi=${this._sesion.GetGnEmpre().emp_codi}`,user.strToken)
  }
}
