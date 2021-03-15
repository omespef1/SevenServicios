import { Injectable } from '@angular/core';
import { TOAccess } from '../../models/general/totransaction';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { transaction } from '../../pages/ae/aereser/models/models';
import { etcotiz } from '../../models/et/etcotiz';

@Injectable({
  providedIn: 'root'
})
export class EtcotizService {

  constructor(private _http: HttpManagerService,
    private _sesion: SessionsService) { }

  getCursos(user: TOAccess) {
    return this._http.Get<transaction>(`EtCotiz/getCursos?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`, user.strToken)
  }

  setEtCotiz(Cotizaciones: etcotiz, user: TOAccess) {
    return this._http.Post<transaction>('/EtCotiz/setEtCotiz', Cotizaciones, user.strToken);
  }
}
