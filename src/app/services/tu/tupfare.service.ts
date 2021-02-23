import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TupfareService {

  constructor(private http:HttpManagerService) { }


  getTuPfare(emp_codi:number){
    return this.http.Get(`TU_PFARE?emp_codi=${emp_codi}`)
}
}
