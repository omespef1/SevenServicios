import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class TuplatuService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetTuPlatu(){
    return this._http.Get<transaction>(`/tuplatu?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`)
  }

}
