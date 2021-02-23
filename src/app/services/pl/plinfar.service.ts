import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { plinfar } from '../../models/pl/plinfar';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlinfarService {
loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _http:HttpManagerService) {

   }


   SetPlInfar(plinfar:plinfar,user:TOAccess){
     this.loading.next(true);
     return this._http.Post<transaction>('/plinfar',plinfar,user.strToken).pipe(map((resp)=>{
          this.loading.next(false);
          return resp;
     }))
   }
}
