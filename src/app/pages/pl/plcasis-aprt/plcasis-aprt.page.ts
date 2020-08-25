import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { plapert } from '../../../models/pl/plapert';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PlapertService } from '../../../services/pl/plapert.service';
import { ModalController } from '@ionic/angular';

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
  @ViewChild(AlertComponent,{'static': false}) _alertC: AlertComponent;

  constructor(private _service: PlapertService,
              private _modal: ModalController) { }

  ngOnInit() {
    this.getAperturas();
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user, this.asi_fefi, this.asi_fefi).subscribe((resp: ToTransaction) => {
      this.Plapert = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alertC.show(resp.TxtError, 'danger');
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
