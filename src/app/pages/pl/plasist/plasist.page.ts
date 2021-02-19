import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { plasist } from "src/app/models/pl/plasist";
import { TOAccess } from '../../../models/general/totransaction';
import { PlasistService } from '../../../services/pl/plasist.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { PlasistEstuPage } from '../plasist-estu/plasist-estu.page';

@Component({
  selector: 'app-plasist',
  templateUrl: './plasist.page.html',
  styleUrls: ['./plasist.page.scss'],
})
export class PlasistPage implements OnInit {
  asi_desc = "";
  apc_cont = 7;
  asi_cont = 0;
  enableButton = false;
  loading = false;
  user: TOAccess;

  constructor(public alertCtrl: AlertController,
              private _service: PlasistService,
              private _sesion: SessionsService,
              private _auth: AuthService,
              private _alert: AlertService,
              private _modal: ModalController) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: mensaje,
      buttons: [
        {
          text: 'Ok',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }

  async getAperturas() {

  }

  async marcarAsistencias() {
    if (this.apc_cont == 0) {
      this.presentAlert('Por favor seleccione una apertura');
    }
    else {
      if (this.asi_desc.length == 0) {
        this.presentAlert('Por favor ingrese una descripción');
      }
      else {
        this.loading = true;
        let Asistencias: plasist = {
          emp_codi: this._sesion.GetGnEmpre().emp_codi,
          ter_coda: this.user.objResult.cli_coda,
          apc_cont: this.apc_cont,
          asi_desc: this.asi_desc
        }
    
        this._service.setPlAsist(Asistencias, this.user).subscribe(async resp => {
          if (resp.Retorno == 1) {
            this._alert.showAlert('Retono', resp.TxtError);
          }
          else {
            this.asi_cont = resp.ObjTransaction.asi_cont;
            const modal = await this._modal.create({
              component: PlasistEstuPage,
              componentProps: {
                asi_cont: this.asi_cont
              }
            });
    
            await modal.present();
            await modal.onDidDismiss();
          }
        });
      }      
    }        
  }

}
