import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class PlcaculService {
  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetPlCacul(){
    return this._http.Get<transaction>(`/plcacul?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`)
  }

}
