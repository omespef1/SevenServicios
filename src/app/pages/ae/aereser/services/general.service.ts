import { Injectable } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private alert: AlertController, private toast: ToastController, private _browser: BrowserTab, private actionCtrl: ActionSheetController,
    private InAppBrowser: InAppBrowser, private platform: Platform) { }



    //Muestra una alerta con botón OK
   async ShowMessageAlert(title: string, msg: string) {
      let alertCtrl = await this.alert.create({
        header: title,
        message: msg,
        buttons: ['OK']
      });
      alertCtrl.present();
    }
    //Muestra una alerta con una promesa que se resuelve cuando hacen click en el botón Aceptar
   async ShowMessageAlertAction(title: string, msg: string): Promise<any> {

      const alert = await this.alert.create({
        header: title,      
        message: msg,
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  //Muestra una alerta con promesa que se resuelve al dar click en aceptar, el botón descartar rechaza la promesa
    async showMessageOption(title: string, subTitle: string) {
  
    
        let alertCtrl = await this.alert.create({
          message: subTitle,
          header: title,
          buttons: [
  
            {
              role: 'cancel',
              text: 'Descartar',
              handler: data => {
                
              }
            },
            {
  
              text: 'Si',
              handler: data => {
               
              }
            }
          ]
        })
      await alertCtrl.present();
    
     
    }
    //Convertir fecha para ios
    convertDateForIos(date: any) {
      let t = date.split(/[- :]/);
      // Apply each element to the Date function
      let d: Date = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
      var actiondate = new Date(d);
      return actiondate;
    }
    //Muestra toast con mensaje
   async showToastMessage(msg: string, position: string) {
      let toastCtrl = await this.toast.create({
        message: msg,
        position:"bottom",
        duration: 4000,
        closeButtonText: 'OK',
        showCloseButton: true
      });
         
      toastCtrl.present();
    }

    //añade minutos a una fecha
    addMinutes(minutes) {
      let momentOfTime = new Date();
      let myTimeSpan = minutes * 60 * 1000;
      momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
      return momentOfTime;
    }
  
    showConfirmMessage(title: string, subTitle: string, data: any[] = null) {
      var promise = new Promise((resolve, reject) => {
        // let alert = this.alert.create();
        // alert.setTitle(title);
        // alert.setSubTitle(subTitle);
        // if (data) {
        //   for (let option of data) {
        //     alert.addInput({
        //       type: 'radio',
        //       label: option.Ite_nomb,
        //       value: option.Ite_cont,
        //     });
        //   }
        // }
        // alert.addButton({
        //   text: 'Cancelar',
        //   handler: () => {
  
        //   }
        // });
        // alert.addButton({
        //   text: 'OK',
        //   handler: (data: any) => {
        //     if (data != undefined)
        //       resolve(data);
        //     if (data == undefined)
        //       reject(null);
        //   }
        // });
        // alert.present();
      })
      return promise;
    }
  
    openUrl(url: string) {
      if (url.indexOf('http') == -1 && url.indexOf('https') ==-1)        
      url = `http://${url}`;  
      if(!this.platform.is("cordova")) 
      window.open(url,'_blank');
      else
      this._browser.openUrl(url);
    }
    async ShowActionSheetAlert(title: string, butttons: any[]) {
      let action =  await this.actionCtrl.create({
        header: title,
        buttons: butttons
      })
      action.present();
    }
     openMarket(packageId: string) {
       if (packageId.split("|").length > 1){
           if(this.platform.is("android"))
            packageId = packageId.split("|")[1];
            if(this.platform.is("ios"))
             packageId = packageId.split("|")[0];
         }
         else {
           packageId = packageId;
         }
    }
  
    openBrowser(url:string){
     let browser =  this.InAppBrowser.create(url);
       return browser;
    }
  
    addDays(date: Date, days: number): Date {
      date.setDate(date.getDate() + days);
      return date;
  }
  
  setTimeInDate( date : Date,hours:number,minutes:number){
    date.setHours(hours,minutes,0);
    return date;
  }
  
}
