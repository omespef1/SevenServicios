import { TOAccess } from './../../models/general/totransaction';
import { Injectable } from '@angular/core';
import { DtInfar } from 'src/app/models/dt/dtinfar.model';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { Inscription } from '../../models/general/inscription.model';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DtinfarService {

  constructor(private http:HttpManagerService) { }



  GetDtInfar(emp_codi:number, cli_coda:string){
    return this.http.Get<transaction>(`DtInfar?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
  }

  loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  SetDtInfar(inscription:DtInfar,user:TOAccess){
    this.loading.next(true);
    return this.http.Post<transaction>('/DtInfar',inscription).pipe(map(resp=>{
      this.loading.next(false);       
      finalize(()=>{
        this.loading.next(false);
      })
   return resp;
             
    }))
  }
}
