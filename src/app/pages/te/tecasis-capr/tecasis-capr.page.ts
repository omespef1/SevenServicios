import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { tecaper } from '../../../models/te/tecapr';
import { TecaperService } from '../../../services/te/tecaper.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ModalController } from '@ionic/angular';

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
  @ViewChild(AlertComponent,{'static': false}) _alertC: AlertComponent;

  constructor(private _service: TecaperService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getCAperturas();
  }

  getCAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getCAperturas(user, this.asi_fein, this.asi_fefi, this.apc_cont).subscribe((resp: ToTransaction) => {
      this.TeCaper = resp.ObjTransaction;
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
