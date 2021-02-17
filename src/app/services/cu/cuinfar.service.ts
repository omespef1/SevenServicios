import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CuInfar } from 'src/app/models/cu/cuinfar.model';
import { transaction } from 'src/app/pages/ae/aereser/models/models';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CuinfarService {

  constructor(private http:HttpManagerService) { }



  GetCuInfar(emp_codi:number, cli_coda:string){
    return this.http.Get<transaction>(`cuinfar?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
  }

  SetCuInfar(subject:CuInfar){
    return this.http.Post<transaction>('cuinfar',subject);
  }
}
