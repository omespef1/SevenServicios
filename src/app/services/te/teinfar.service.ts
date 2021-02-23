import { TOAccess } from './../../models/general/totransaction';

import { Injectable } from '@angular/core';
import {  ToTransaction } from '../../models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TeInfarService {

  constructor(private http:HttpManagerService) { }

  SetTeInfar(teinfar:any,user:TOAccess){
    return this.http.Post<ToTransaction>('/teinfar',teinfar,user.strToken);
  }


  getTePfare(emp_codi:number){
    return this.http.Get<ToTransaction>(`TePFare?emp_codi=${emp_codi}`)
}
}
