import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { gmcotiz } from '../../models/gm/gmcotiz';

@Injectable({
  providedIn: 'root'
})
export class GmcotizService {

  constructor(private _http: HttpManagerService,
    private _sesion: SessionsService) { }

  getPlanes(user: TOAccess) {
    return this._http.Get<transaction>(`GmCotiz/getPlanes?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`, user.strToken)
  }

  setGmCotiz(Cotizaciones: gmcotiz, user: TOAccess) {
    return this._http.Post<transaction>('/GmCotiz/setGmCotiz', Cotizaciones, user.strToken);
  }
}
