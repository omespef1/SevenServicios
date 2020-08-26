import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class PlapertService {

  constructor(private _http: HttpManagerService, 
              private sesion: SessionsService, 
              private http: HttpClient, 
              private _sesion: SessionsService) { }

  getAperturas(user: TOAccess, asi_fein: Date, asi_fefi: Date) {
    return this._http.Get<transaction>(`PlCasis/GetAsistenciasPL?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}&asi_fein=${asi_fein}&asi_fefi=${asi_fefi}`, user.strToken)
    
  }
}
