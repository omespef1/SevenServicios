import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TeapertService } from '../../../services/te/teapert.service';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { teapert } from '../../../models/te/teapert';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ModalController } from '@ionic/angular';

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
  @ViewChild(AlertComponent,{'static': false}) _alertC: AlertComponent;

  constructor(private _service: TeapertService,
              private _modal: ModalController) { }

  ngOnInit() {
    this.getAperturas();
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user, this.asi_fefi, this.asi_fefi).subscribe((resp: ToTransaction) => {
      this.Teapert = resp.ObjTransaction;
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

  async SetApertura(Asistencia: teapert) {
    await this._modal.dismiss(Asistencia);
  }

  CerrarModal() {
    this._modal.dismiss();
  }
}
