import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { ToTransactionCentralizacion } from '../../models/general/totransaction';

@Injectable({
  providedIn: 'root'
})
export class GnconexService {

  constructor(private _http:HttpManagerService) { }


  GetGnConex(){
    return this._http.GetCentralizacion<ToTransactionCentralizacion>('GnConex/GetConnections?app_cont=1002');
  }
}
