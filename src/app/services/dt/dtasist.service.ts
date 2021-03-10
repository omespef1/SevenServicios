import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { dtasist, dtasise } from '../../models/dt/dtasist';

@Injectable({
  providedIn: 'root'
})
export class DtasistService {

  constructor(private _http: HttpManagerService, 
              private _sesion: SessionsService) { }

  getAperturas(user: TOAccess){
    return this._http.Get<transaction>(`DtAsist/getAperturas?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}`,user.strToken)
  }

  setDtAsist(dtasist: dtasist, user: TOAccess) {
    return this._http.Post<transaction>('/DtAsist/setDtAsist',dtasist, user.strToken);
  }

  CambiarEstado(user: TOAccess, asi_cont: number, asi_esta: string) {
    return this._http.Post<transaction>(`DtAsist/CambiarEstado?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}&asi_esta=${asi_esta}`,user.strToken)
  }

  MarcarAsist(user: TOAccess, dtasise: dtasise[]) {
    return this._http.Post<transaction>(`DtAsist/MarcarAsist`, dtasise, user.strToken)
  }

  getEstudiantes(user: TOAccess, asi_cont: number) {
    return this._http.Get<transaction>(`DtAsist/getEstudiantes?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}`,user.strToken)
  }  
}
