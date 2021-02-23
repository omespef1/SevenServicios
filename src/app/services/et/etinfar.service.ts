import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EtInfar } from '../../models/et/EtInfar';
import { TOAccess, ToTransaction } from '../../models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EtInfarService {
  loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _http:HttpManagerService) { }

  SetEtInfar(EtInfar:EtInfar,user:TOAccess){
    return this._http.Post<ToTransaction>('/EtInfar',EtInfar,user.strToken);
  }
}
