import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { dtcotiz } from '../../models/dt/dtcotiz';

@Injectable({
  providedIn: 'root'
})
export class DtcotizService {

  constructor(private _http: HttpManagerService,
    private _sesion: SessionsService) { }

  getLisCodi(user: TOAccess) {
    return this._http.Get<transaction>(`DtCotiz/getLisCodi?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`, user.strToken)
  }

  getProductos(user: TOAccess, lis_codi: number) {
    return this._http.Get<transaction>(`DtCotiz/getProductos?emp_codi=${this._sesion.GetGnEmpre().emp_codi}&lis_codi=${lis_codi}`, user.strToken)
  }

  setDtCotiz(dtcotiz: dtcotiz, user: TOAccess) {
    return this._http.Post<transaction>('/DtCotiz/setDtCotiz', dtcotiz, user.strToken);
  }
}
