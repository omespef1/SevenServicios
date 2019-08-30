
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }
 
   canActivate(route: ActivatedRouteSnapshot)  {     
    return this.auth.loadUser()!=undefined;
  }
 
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Acceso no permitido',
      message: 'Usted no está autorizado para ingresar a esta página!',
      buttons: ['OK']
    });
    alert.present();
  }
}