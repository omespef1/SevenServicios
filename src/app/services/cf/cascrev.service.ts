import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { TOAccess } from '../../models/general/totransaction';

@Injectable({
  providedIn: 'root'
})
export class CascrevService {

  constructor(private _http:HttpManagerService) { }


  GetCaScrev(user:TOAccess){      
     return   this._http.Get<transaction>(`/CaScrev?cli_coda=${user.objResult.cli_coda}&`, user.strToken);
  }
}
