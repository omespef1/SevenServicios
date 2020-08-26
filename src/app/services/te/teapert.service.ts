import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { TOAccess } from 'src/app/models/general/totransaction';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeapertService {
  private httpOptions: {
    headers: HttpHeaders;
  };

  constructor(private _http: HttpManagerService, private sesion: SessionsService, private http: HttpClient, private _sesion:SessionsService) { }

  getAperturas(user: TOAccess, asi_fein: Date, asi_fefi: Date) {

    return this._http.Get<transaction>(`TeCasis/GetAsistenciasTE?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&cli_coda=${user.objResult.cli_coda}&asi_fein=${asi_fein}&asi_fefi=${asi_fefi}`,user.strToken)
    // return this.http.get<transaction>('http://localhost/RSevSer/api/TeCasis/GetAsistenciasTE?emp_codi=675&cli_coda=65769477&asi_fein=2000-01-01&asi_fefi=2020-08-19', <object>options);
  }
}