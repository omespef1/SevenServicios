import { Component, OnInit, PipeTransform } from '@angular/core';
import { PickerController, AlertController, ModalController } from '@ionic/angular';
import { TecasisAprtPage } from '../tecasis-aprt/tecasis-aprt.page';
import { teapert } from '../../../models/te/tecapr';
import { TecasisCaprPage } from '../tecasis-capr/tecasis-capr.page';
import { DatePipe } from "@angular/common";
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-tecasis',
  templateUrl: './tecasis.page.html',
  styleUrls: ['./tecasis.page.scss'],
})
export class TecasisPage implements OnInit {  
  enableFecI = true;
  enableFecF = true;
  enableButton = true;
  fecInic: Date;
  fecFini: Date;
  Teapert: teapert[];
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
        component: TecasisCaprPage,
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

  async GetAsistenciasTE() {
    if (this.fecInic > this.fecFini) {
      this._alert.warning("La fecha final no puede ser mayor a la fecha inicial");
    } else {
    const modal = await this._modal.create({
      component: TecasisAprtPage,
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
      console.log(this.Teapert);
      this.apc_desc = resp.data.apc_desc;
      this.apc_cont = resp.data.apc_cont;
      }
    });
    }
  }
}
