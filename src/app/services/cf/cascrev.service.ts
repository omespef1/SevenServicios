import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { TOAccess } from '../../models/general/totransaction';
import { SessionsService } from '../sessions/sessions.service';

@Injectable({
  providedIn: 'root'
})
export class CascrevService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }


  GetCaScrev(user:TOAccess){      
     return   this._http.Get<transaction>(`/CaScrev?cli_coda=${user.objResult.cli_coda}&emp_codi=${this._sesion.GetGnEmpre().emp_codi}`, user.strToken);
  }
}
