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

  GetPlPfare(emp_codi:number){
  return  this._http.Get<transaction>(`/PL_PFARE1?emp_codi=${emp_codi}`);
  }

  
}
