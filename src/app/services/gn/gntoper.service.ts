import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { SessionsService } from '../sessions/sessions.service';

@Injectable({
  providedIn: 'root'
})
export class GntoperService {

  constructor(private _auth:AuthService,private _http:HttpManagerService,private _sesion:SessionsService) { }


  GetGnToper(){
    return this._http.Get<transaction>(`/GmPfare?mod_codi=195&emp_codi=${this._sesion.GetGnEmpre().emp_codi}`);
  }
}
