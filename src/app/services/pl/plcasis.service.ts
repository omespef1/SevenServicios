import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class PlcasisService {

  constructor(private _http: HttpManagerService, 
              private _sesion: SessionsService) { }

  GetAsistenciasPL(user: TOAccess, asi_fein: Date, asi_fefi: Date) {
    return this._http.Get<transaction>(`PlCasis/GetAsistenciasPL?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}&asi_fein=${asi_fein}&asi_fefi=${asi_fefi}`, user.strToken)    
  }

  GetCasisPL(user: TOAccess, asi_fein: Date, asi_fefi: Date, apc_cont: number) {
    if (apc_cont !== 0) {
      return this._http.Get<transaction>(`PlCasis/GetCasisPL?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}&asi_fein=${asi_fein}&asi_fefi=${asi_fefi}&apc_cont=${apc_cont}`,user.strToken)
    } else {
      return this._http.Get<transaction>(`PlCasis/GetCasisPL?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}&asi_fein=${asi_fein}&asi_fefi=${asi_fefi}`,user.strToken)
    }
  }
}
