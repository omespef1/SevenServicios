import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { SessionsService } from '../sessions/sessions.service';
import { TOAccess } from '../../models/general/totransaction';
import { transaction } from '../../pages/ae/aereser/models/models';
import { tecotiz } from '../../models/te/tecotiz';

@Injectable({
  providedIn: 'root'
})
export class TecotizService {

  constructor(private _http: HttpManagerService,
    private _sesion: SessionsService) { }

  getCursos(user: TOAccess) {
    return this._http.Get<transaction>(`TeCotiz/getCursos?emp_codi=${this._sesion.GetGnEmpre().emp_codi}`, user.strToken)
  }

  setTeCotiz(Cotizaciones: tecotiz, user: TOAccess) {
    return this._http.Post<transaction>('/TeCotiz/setTeCotiz', Cotizaciones, user.strToken);
  }
}
