import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { plcotiz } from '../../models/pl/plcotiz';

@Injectable({
  providedIn: 'root'
})
export class PlcotizService {

  constructor(private _http: HttpManagerService,
    private _sesion: SessionsService) { }

  getCursos(user: TOAccess) {
    return this._http.Get<transaction>(`PlCotiz/getCursos?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`, user.strToken)
  }

  setPlCotiz(Cotizaciones: plcotiz, user: TOAccess) {
    return this._http.Post<transaction>('/PlCotiz/setPlCotiz', Cotizaciones, user.strToken);
  }
}
