import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { EtAsist, EtDasis } from '../../models/et/etasist';

@Injectable({
  providedIn: 'root'
})
export class EtasistService {

  constructor(private _http: HttpManagerService, 
              private _sesion: SessionsService) { }

  getAperturas(user: TOAccess){
    return this._http.Get<transaction>(`EtAsist/getAperturas?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&ter_coda=${user.objResult.cli_coda}`,user.strToken)
  }
            
  setEtAsist(etasist: EtAsist, user: TOAccess) {
    return this._http.Post<transaction>('/EtAsist/setEtAsist',etasist, user.strToken);
  }
            
  CambiarEstado(user: TOAccess, asi_cont: number, asi_esta: string) {
    return this._http.Post<transaction>(`EtAsist/CambiarEstado?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}&asi_esta=${asi_esta}`,user.strToken)
  }
            
  MarcarAsist(user: TOAccess, etdasis: EtDasis[]) {
    return this._http.Post<transaction>(`EtAsist/MarcarAsist`, etdasis, user.strToken)
  }
            
  getEstudiantes(user: TOAccess, asi_cont: number) {
    return this._http.Get<transaction>(`EtAsist/getEstudiantes?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}`,user.strToken)
  } 
}
