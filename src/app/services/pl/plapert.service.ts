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
  private httpOptions: {
    headers: HttpHeaders;
  };

  constructor(private _http: HttpManagerService, private sesion: SessionsService, private http: HttpClient, private _sesion:SessionsService) { }

  getAperturas(user: TOAccess, asi_fein: Date, asi_fefi: Date) {
    let headers = new Headers();
    const headerAuth = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      Authorization: user.strToken
    };
    headers = new HttpHeaders(headerAuth);    
    let options: any = {
      headers: headers,
      observe: "body"
    };
    
    return this._http.Get<transaction>(`PlCasis/GetAsistenciasPL?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}&asi_fein=${asi_fein}&asi_fefi=${asi_fefi}`,user.strToken)
    //return this.http.get<transaction>('http://localhost/RSevSer/api/PlCasis/GetAsistenciasPL?emp_codi=675&cli_coda=65769477&asi_fein=2000-01-01&asi_fefi=2020-08-19', <object>options);
  }
}
