import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class GmplaneService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetGmPlane(){
    return this._http.Get<transaction>(`/gmplane?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`)
  }
}
