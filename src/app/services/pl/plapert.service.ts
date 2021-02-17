import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { plasist } from '../../models/pl/plasist';

@Injectable({
  providedIn: 'root'
})
export class PlapertService {

  constructor(private _http: HttpManagerService, 
              private sesion: SessionsService, 
              private http: HttpClient, 
              private _sesion: SessionsService) { }

  getAperturas(user: TOAccess){
    return this._http.Get<transaction>(`PlAsist/getAperturas?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&ter_coda=${user.objResult.cli_coda}`,user.strToken)
  }

  setPlAsist(plasist: plasist, user: TOAccess) {
    return this._http.Post<transaction>('/plasist/setPlAsist',plasist, user.strToken);
  }

  CambiarEstado(user: TOAccess, asi_cont: number, asi_esta: string) {
    return this._http.Get<transaction>(`PlAsist/CambiarEstado?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}&asi_esta=${asi_esta}`,user.strToken)    
  }
}
