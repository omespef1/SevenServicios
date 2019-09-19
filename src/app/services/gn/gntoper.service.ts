import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class GntoperService {

  constructor(private _auth:AuthService,private _http:HttpManagerService) { }


  GetGnToper(){
    return this._http.Get<transaction>('/GnToper?mod_codi=195&');
  }
}
