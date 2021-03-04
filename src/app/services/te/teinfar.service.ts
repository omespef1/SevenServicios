import { TOAccess } from './../../models/general/totransaction';

import { Injectable } from '@angular/core';
import {  ToTransaction } from '../../models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeInfarService {

  constructor(private http:HttpManagerService) { }
  loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  SetTeInfar(teinfar:any,user:TOAccess){
    this.loading.next(true);       
    return this.http.Post<ToTransaction>('/teinfar',teinfar,user.strToken).pipe(map((resp)=>{
      this.loading.next(false);       
      finalize(()=>{
        this.loading.next(false);
      })
   return resp;
    }))
    
  }


  getTePfare(emp_codi:number){
    return this.http.Get<ToTransaction>(`TePFare?emp_codi=${emp_codi}`)
}
}
