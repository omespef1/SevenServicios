import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { plapert } from '../../../models/pl/plcapr';
import { PlcasisService } from '../../../services/pl/plcasis.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-plcasis-aprt',
  templateUrl: './plcasis-aprt.page.html',
  styleUrls: ['./plcasis-aprt.page.scss'],
})
export class PlcasisAprtPage implements OnInit {
  @Input() asi_fein;
  @Input() asi_fefi;
  loading = false;
  user: TOAccess;
  Plapert: plapert[];
  textoBuscar = '';

  constructor(private _service: PlcasisService,
              private _modal: ModalController,
              private _alert: AlertService) { }

  ngOnInit() {
    this.getAperturas();
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.GetAsistenciasPL(user, this.asi_fein, this.asi_fefi).subscribe((resp: ToTransaction) => {
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      } else {
        this.Plapert = resp.ObjTransaction;
      }
      this.loading = false;
      console.log(resp);
    });
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  async SetApertura(Asistencia: plapert) {
    await this._modal.dismiss(Asistencia);
  }

  CerrarModal() {
    this._modal.dismiss();
  }
}
