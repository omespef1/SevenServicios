import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { TOAccess } from 'src/app/models/general/totransaction';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { teasist } from '../../models/te/tecapr';
import { teasise } from '../../models/te/teasist';

@Injectable({
  providedIn: 'root'
})
export class TeasistService {
  private httpOptions: {
    headers: HttpHeaders;
  };

  constructor(private _http: HttpManagerService, 
              private sesion: SessionsService, 
              private http: HttpClient, 
              private _sesion: SessionsService) { }

  getAperturas(user: TOAccess){
    return this._http.Get<transaction>(`TeAsist/getAperturas?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&ter_coda=${user.objResult.cli_coda}`,user.strToken)
  }

  setTeAsist(teasist: teasist, user: TOAccess) {
    return this._http.Post<transaction>('Teasist/setTeAsist', teasist, user.strToken);
  }

  CambiarEstado(user: TOAccess, asi_cont: number, asi_esta: string) {
    return this._http.Post<transaction>(`TeAsist/CambiarEstado?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}&asi_esta=${asi_esta}`,user.strToken)    
  }  

  MarcarAsist(user: TOAccess, plasise: teasise[]) {
    return this._http.Post<transaction>(`TeAsist/MarcarAsist`, plasise, user.strToken)
  }

  getEstudiantes(user: TOAccess, asi_cont: number) {
    return this._http.Get<transaction>(`TeAsist/getEstudiantes?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}`,user.strToken)
  }

  EliminarTeAsis(user: TOAccess, asi_cont: number) {
    return this._http.Post<transaction>(`TeAsist/EliminarTeAsis?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&asi_cont=${asi_cont}`,user.strToken)
  }
}