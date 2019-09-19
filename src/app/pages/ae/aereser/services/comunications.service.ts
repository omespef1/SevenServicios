import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { HttpManagerService } from '../../../../services/httpManager/http-manager.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ComunicationsService {
  loading: any;
  constructor( private load: LoadingController,private _sesion:SessionService,private _http:HttpManagerService,private _general:GeneralService) { 


  }

  Get(UrlService: string, loading: boolean = true, content: string = "Cargando...", requiteEmpCodi = true) {
    console.log('haciendo Get...');
    // this._events.publish('onBackground');
    this.loading = this.load.create({
      message: content,     
    });   
    let promise = new Promise((resolve, reject) => {
      if (loading)
        this.loading.present();
      let stringUrl = `${this._sesion.GetClientUrl()}${UrlService}`;
      if (requiteEmpCodi)
        stringUrl += `&emp_codi=${this._sesion.GetClientEmpCodi()}`;
      console.log(stringUrl);
    


      return this._http.Get(stringUrl)
        .subscribe((resp: any) => {
          // this._events.publish('offBackground');
          console.log(stringUrl);
          // console.log(resp);
          if (loading)
            this.loading.dismiss();
          if (resp.Retorno == 1) {
            this.ErrMessage(resp.TxtError);
            resp = null;
          }
          resolve(resp);
        }, (err: HttpErrorResponse) => {
          // this._events.publish('offBackground');
          console.log(err);
          this.ErrMessage(err.error);
          if (loading)
            this.loading.dismiss();
        })
    })
    return promise;
  }

  Post(params: any, urlService: string, content: string = "Cargando...") {
    console.log('haciendo post...');
    this.loading = this.load.create({
      message: content,        
    });
    let promise = new Promise((resolve, reject) => {
      this.loading.present();
      console.log(this._sesion.GetClientUrl() + urlService);    
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin':'*'
        }
  
        let bodyRequest: any = {
          headers:  new HttpHeaders(headerDict),              
        }
     

      return this._http.Post(this._sesion.GetClientUrl() + urlService, params)
      //   return error
      //     .flatMap((error: any) => {
      //       if (error.status === 503) {
      //         return Observable.of(error.status).delay(1000)
      //       }
      //       return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
      //     })
      //     .take(5)
      //     .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
      // })

        .subscribe((resp: any) => {
          this.loading.dismiss();
          // console.log(resp)
          if (resp.Retorno == 1) {
            this.ErrMessage(resp.TxtError);
            resp = null;
          }
          resolve(resp);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.ErrMessage(err.error);
          this.loading.dismiss();
        })
      // }

    });


    return promise;
  }
  ErrMessage(msg: string) {
    this._general.showToastMessage(msg, 'bottom');
  }
}
