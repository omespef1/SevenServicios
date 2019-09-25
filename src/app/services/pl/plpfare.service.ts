import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from '../../pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class PlPfareService {

  constructor(private _http:HttpManagerService) { 

  }

  GetPlInfare(){
  return  this._http.Get<transaction>('/PlPfare?');
  }
}
