import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TeapertService } from '../../../services/te/teapert.service';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { teapert } from '../../../models/te/teapert';
import { ModalController } from '@ionic/angular';
import { user } from '../../ae/aereser/models/models';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-tecasis-aprt',
  templateUrl: './tecasis-aprt.page.html',
  styleUrls: ['./tecasis-aprt.page.scss'],
})
export class TecasisAprtPage implements OnInit {
  @Input() asi_fein;
  @Input() asi_fefi;
  loading = false;
  user: TOAccess;
  Teapert: teapert[] = [];
  textoBuscar = '';

  constructor(private _service: TeapertService,
              private _modal: ModalController,
              private _alert: AlertService) { }

  ngOnInit() {
    this.getAperturas();
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user, this.asi_fein, this.asi_fefi).subscribe((resp: ToTransaction) => {
      if (resp.Retorno == 1) {
        this._alert.showAlert('Retorno', resp.TxtError);
      } else {
        this.Teapert = resp.ObjTransaction;
      }
      this.loading = false;
      console.log(resp);
    });
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  async SetApertura(Asistencia: teapert) {
    await this._modal.dismiss(Asistencia);
  }

  CerrarModal() {
    this._modal.dismiss();
  }
}
