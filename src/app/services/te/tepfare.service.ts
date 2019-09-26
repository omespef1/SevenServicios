import { Injectable } from '@angular/core';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';

@Injectable({
  providedIn: 'root'
})
export class TePfareService {

  constructor(private _http:HttpManagerService,private _sesion:SessionsService) { }

  GetTePfare(){
    return  this._http.Get<transaction>(`/TePfare?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`);
  }
}
