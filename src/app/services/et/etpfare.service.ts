import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from '../../pages/ae/aereser/models/models';
import { ToTransaction, ToTransactionT } from '../../models/general/totransaction';
import { TypeOperation } from 'src/app/models/general/type-operation.model';

@Injectable({
  providedIn: 'root'
})
export class EtpfareService {

  constructor(private http:HttpManagerService) { }


  getEtPfare(emp_codi:number){
    return this.http.Get<ToTransactionT<TypeOperation[]>>(`ET_PFARE?emp_codi=${emp_codi}`)
}
}
