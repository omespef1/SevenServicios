import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { tecaper } from '../../../models/te/tecapr';
import { TecasisService } from '../../../services/te/tecasis.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-tecasis-capr',
  templateUrl: './tecasis-capr.page.html',
  styleUrls: ['./tecasis-capr.page.scss'],
})
export class TecasisCaprPage implements OnInit {
  @Input() asi_fein;
  @Input() asi_fefi;
  @Input() apc_cont;
  loading = false;
  user: TOAccess;
  TeCaper: tecaper[];

  constructor(private _service: TecasisService,
              private modalCtrl: ModalController,
              private _alert: AlertService) { }

  ngOnInit() {
    this.getCAperturas();
  }

  getCAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.GetCasisTE(user, this.asi_fein, this.asi_fefi, this.apc_cont).subscribe((resp: ToTransaction) => {
      this.TeCaper = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alert.showAlert('Retorno', resp.TxtError);
      }
      this.loading = false;
      console.log(resp);
    });
  }

  CerrarModal() {
    this.modalCtrl.dismiss();
  }

}
