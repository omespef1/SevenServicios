import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class EtcursoService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetEtCurso(){
    return this._http.Get<transaction>(`/etcurso?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`)
  }
}
