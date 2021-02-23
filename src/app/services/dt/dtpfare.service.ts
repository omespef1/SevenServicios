import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { DtPfare } from '../../models/dt/dtpfare.model';
import { ToTransaction } from '../../pages/ae/aereser/models/models';
import { TypeOperation } from '../../models/general/type-operation.model';

@Injectable({
  providedIn: 'root'
})
export class DtpfareService {

  constructor(private http:HttpManagerService) { }


  getDtPfare(emp_codi:number){
    return this.http.Get<ToTransaction<TypeOperation[]>>(`DT_PFARE?emp_codi=${emp_codi}`)
}

}
