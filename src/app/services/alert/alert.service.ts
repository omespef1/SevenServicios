import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { resolve } from 'dns';
import { promise } from 'protractor';

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private _alert: AlertController) {}

  async showAlert(title: string, message: string) {
    let alert = await this._alert.create({
      header: title,
      message: message,
      buttons: ["OK"]
    });
    alert.present();
  }

  async showAlertConfirm(msg: string, title: string) {
    return new Promise(async resolve=>{
      const alert = await this._alert.create({
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              resolve(false);
            },
          },
          {
            text: "Si",
            handler: ok => {
             resolve(true);
            }
          }
        ],
        message: msg,
        header: title
      });
  
     await alert.present();
    })
   
  }
}
