import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction, user } from '../../pages/ae/aereser/models/models';
import { plasist } from '../../models/pl/plcapr';
import { plasise } from '../../models/pl/plasist';

@Injectable({
  providedIn: 'root'
})
export class PlasistService {

  constructor(private _http: HttpManagerService, 
              private _sesion: SessionsService) { }

  getAperturas(user: TOAccess){
    return this._http.Get<transaction>(`PlAsist/getAperturas?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&ter_coda=${user.objResult.cli_coda}`,user.strToken)
  }

  setPlAsist(plasist: plasist, user: TOAccess) {
    return this._http.Post<transaction>('/plasist/setPlAsist',plasist, user.strToken);
  }

  CambiarEstado(user: TOAccess, asi_cont: number, asi_esta: string) {
    return this._http.Post<transaction>(`PlAsist/CambiarEstado?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}&asi_esta=${asi_esta}`,user.strToken)
  }

  MarcarAsist(user: TOAccess, plasise: plasise[]) {
    return this._http.Post<transaction>(`PlAsist/MarcarAsist`, plasise, user.strToken)
  }

  getEstudiantes(user: TOAccess, asi_cont: number) {
    return this._http.Get<transaction>(`PlAsist/getEstudiantes?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}`,user.strToken)
  }
}
