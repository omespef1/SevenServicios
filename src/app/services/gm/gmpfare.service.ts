import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { TypeOperation } from '../../models/general/type-operation.model';
import { ToTransaction } from 'src/app/pages/ae/aereser/models/models';

@Injectable({
  providedIn: 'root'
})
export class GmpfareService {

  constructor(private http:HttpManagerService) { }


  getGmPfare(emp_codi:number){
      return this.http.Get<ToTransaction<TypeOperation[]>>(`GM_PFARE?emp_codi=${emp_codi}`)
  }
}
