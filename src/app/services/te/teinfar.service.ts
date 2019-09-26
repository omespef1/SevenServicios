import { Injectable } from '@angular/core';
import { teinfar } from '../../models/te/teinfar';
import { TOAccess, ToTransaction } from '../../models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TeInfarService {

  constructor(private _http:HttpManagerService) { }

  SetTeInfar(teinfar:teinfar,user:TOAccess){
    return this._http.Post<ToTransaction>('/teinfar',teinfar,user.strToken);
  }
}
