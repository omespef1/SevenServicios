import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { plcaper } from '../../../models/pl/plcapr';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PlcaperService } from '../../../services/pl/plcaper.service';
import { ModalController } from '@ionic/angular';

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
  @ViewChild(AlertComponent,{'static': false}) _alertC: AlertComponent;

  constructor(private _service: PlcaperService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getCAperturas();
  }

  getCAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getCAperturas(user, this.asi_fein, this.asi_fefi, this.apc_cont).subscribe((resp: ToTransaction) => {
      this.PlCaper = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alertC.show(resp.TxtError, 'danger');
      }
      this.loading = false;
      console.log(resp);
    });
  }

  CerrarModal() {
    this.modalCtrl.dismiss();
  }

}
