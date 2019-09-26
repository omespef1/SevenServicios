import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { TOAccess } from '../../models/general/totransaction';

@Injectable({
  providedIn: 'root'
})
export class CaregobService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetCaRegob(user:TOAccess){
    return this._http.Get<transaction>(`/CaRegob?cli_coda=${user.objResult.cli_coda}&emp_codi=${this._sesion.GetGnEmpre().emp_codi}`,user.strToken)
  }
}
