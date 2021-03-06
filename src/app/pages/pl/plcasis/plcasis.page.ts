import { Component, OnInit } from '@angular/core';
import { PickerController, AlertController, ModalController } from '@ionic/angular';
import { PlcasisAprtPage } from '../plcasis-aprt/plcasis-aprt.page';
import { plapert } from '../../../models/pl/plcapr';
import { PlcasisCaprPage } from '../plcasis-capr/plcasis-capr.page';
import { DatePipe } from "@angular/common";
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-plcasis',
  templateUrl: './plcasis.page.html',
  styleUrls: ['./plcasis.page.scss'],
})
export class PlcasisPage implements OnInit {
  enableFecI = true;
  enableFecF = true;
  enableButton = true;
  fecInic: Date;
  fecFini: Date;
  Plaprt: plapert[];
  apc_desc = "";
  apc_cont = 0;

  constructor(private pickerController: PickerController,
              public alertCtrl: AlertController,
              private _modal: ModalController,
              private datePipe: DatePipe,
              private _alert: AlertService) { }

  ngOnInit() {
  }

  CambioFechaInic(event) {
    this.enableFecI = false;

    if (this.enableFecI === false && this.enableFecF === false) {
      this.enableButton = false;
    }

    this.fecInic = new Date(event.detail.value);
  }

  CambioFechaFini(event) {
    this.enableFecF = false;

    if (this.enableFecI === false && this.enableFecF === false) {
      this.enableButton = false;
    }

    this.fecFini = new Date(event.detail.value);
  }

  async BuscarAsis() {
    if (this.fecInic > this.fecFini) {
      this._alert.warning("La fecha final no puede ser mayor a la fecha inicial");
    } else {
      const modal = await this._modal.create({
        component: PlcasisCaprPage,
        componentProps: {
          asi_fein: this.datePipe.transform(this.fecInic, 'yyyy/MM/dd'),
          asi_fefi: this.datePipe.transform(this.fecFini, 'yyyy/MM/dd'),
          apc_cont: this.apc_cont
        }
      });

      await modal.present();
      await modal.onDidDismiss();
    }
  }

  async GetAsistenciasPL() {
    if (this.fecInic > this.fecFini) {
      this._alert.warning("La fecha final no puede ser mayor a la fecha inicial");
    } else {
    const modal = await this._modal.create({
      component: PlcasisAprtPage,
      componentProps: {
        asi_fein: this.datePipe.transform(this.fecInic, 'yyyy/MM/dd'),
        asi_fefi: this.datePipe.transform(this.fecFini, 'yyyy/MM/dd')
      }
    });

    await modal.present();

    await modal.onDidDismiss().then(resp => {
      if (resp.data == null) {
        this.apc_desc = "";
        this.apc_cont = 0;
      } else {
        console.log(this.Plaprt);
        this.apc_desc = resp.data.apc_desc;
        this.apc_cont = resp.data.apc_cont;
      }
    });
    }
  }
}
