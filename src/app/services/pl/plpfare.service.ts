import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from '../../pages/ae/aereser/models/models';
import { SessionsService } from '../sessions/sessions.service';


@Injectable({
  providedIn: 'root'
})
export class PlPfareService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { 

  }

  GetPlPfare(){
  return  this._http.Get<transaction>(`/PlPfare?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`);
  }
}
