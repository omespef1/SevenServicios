import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plasist',
  templateUrl: './plasist.page.html',
  styleUrls: ['./plasist.page.scss'],
})
export class PlasistPage implements OnInit {
  asi_desc: string;
  apc_cont: number;

  constructor(public alertCtrl: AlertController) { }

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

}
