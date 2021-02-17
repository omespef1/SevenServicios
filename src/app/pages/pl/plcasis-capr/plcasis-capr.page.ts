import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { plcaper } from '../../../models/pl/plcapr';
import { PlcasisService } from '../../../services/pl/plcasis.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-plcasis-capr',
  templateUrl: './plcasis-capr.page.html',
  styleUrls: ['./plcasis-capr.page.scss'],
})
export class PlcasisCaprPage implements OnInit {
  @Input() asi_fein;
  @Input() asi_fefi;
  @Input() apc_cont;
  loading = false;
  user: TOAccess;
  PlCaper: plcaper[];

  constructor(private _service: PlcasisService,
              private modalCtrl: ModalController,
              private _alert: AlertService) { }

  ngOnInit() {
    this.getCAperturas();
  }

  getCAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.GetCasisPL(user, this.asi_fein, this.asi_fefi, this.apc_cont).subscribe((resp: ToTransaction) => {
      this.PlCaper = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alert.showAlert('Retono', resp.TxtError);
      }
      this.loading = false;
      console.log(resp);
    });
  }

  CerrarModal() {
    this.modalCtrl.dismiss();
  }

}
