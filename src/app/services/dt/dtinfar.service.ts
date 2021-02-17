import { Injectable } from '@angular/core';
import { DtInfar } from 'src/app/models/dt/dtinfar.model';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DtinfarService {

  constructor(private http:HttpManagerService) { }



  GetDtInfar(emp_codi:number, cli_coda:string){
    return this.http.Get<transaction>(`DtInfar?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
  }

  SetDtInfar(subject:DtInfar){
    return this.http.Post<transaction>('DtInfar',subject);
  }
}
