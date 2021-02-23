import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { EtInfar } from '../../models/et/etinfar';
import { TOAccess, ToTransaction } from '../../models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EtInfarService {
  loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _http:HttpManagerService) { }

  SetEtInfar(EtInfar:EtInfar,user:TOAccess){
    this.loading.next(true);
    return this._http.Post<ToTransaction>('/EtInfar',EtInfar,user.strToken).pipe(map((resp)=>{
        this.loading.next(false);
        return resp;
    }))
  }
}
