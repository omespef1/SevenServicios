import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { loginRequest } from "../../models/general/totransaction";
import { AlertService } from "../../services/alert/alert.service";
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { SessionsService } from '../../services/sessions/sessions.service';
import { GnemprePage } from '../gn/gnempre/gnempre.page';
import { GnconexPage } from '../gn/gnconex/gnconex.page';
import { ConfigService } from "src/app/services/config/config.service";
import { developerUrl, developerMode } from 'src/assets/config/config';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  showPass = false;
  user: loginRequest = new loginRequest();
  logo: any = 'assets/imgs/logo.png';
  emp_codi = 0;

  constructor(
    private auth: AuthService,
    private _alert: AlertService,
    private _nav: NavController,
    private router: Router,
    private _sesion: SessionsService,
    private _modal: ModalController,
    private configService: ConfigService,
    public alertCtrl: AlertController,
    //public developermode: typeof developerMode,
    //public developerurl: typeof developerUrl
  ) { }

  async ngOnInit() {
    await this.GetGnConex();
  }

  async GetGnConex() {
    if (this._sesion.GetGnConex() == null) {
      const modal = await this._modal.create({
        component: GnconexPage
      });
      modal.onDidDismiss().then(resp => {
        console.log(resp.data);
        this._sesion.SetGnConex(resp.data);
        this.GetGnEmpre();
        this.GetLogo();
      });
      return await modal.present();
    } else {
      this.GetLogo();
    }
  }

  GetLogo() {
    this.logo = this.configService.Get().CNX_LOGO;
  }


  signIn() {
    this.user.emp_codi = this._sesion.GetGnEmpre().emp_codi;
    this.loading = true;
    console.log(this.user);
    this.auth.signIn(this.user).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      if (resp.codeResult == 0) {
        localStorage.setItem("user", JSON.stringify(resp));
        this._alert.showAlert(
          "Ingreso exitoso",
          `Se ha logueado exitosamente con  ${resp.objResult.cli_noco} `
        );
        this._nav.navigateRoot("tabs/menu", { animated: true });
      } else {
        this._alert.showAlert("Ingreso fallido", `${resp.errorMessage}`);
      }
    }, err => {
      this.loading = false;
      this._alert.showAlert('Error', err);
    });
  }

  facebook() {
    this.auth.loginWithFacebook();
  }


  async GetGnEmpre() {
    const modal = await this._modal.create({
      component: GnemprePage
    });
    modal.onDidDismiss().then(resp => {
      console.log(resp);
      this._sesion.SetGnEmpre(resp.data);
    });
    return await modal.present();
  }

  async getPass() {
    let alert = await this.alertCtrl.create({
      header: 'Llave de configuración',
      message: 'Ingrese la llave de configuración',
      inputs: [
        {
          name: 'password',
          type: 'password'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            if (alertData.password == "sistemas") {
              console.log(alertData.password);
              this.changeURI();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async changeURI() {
    let alert = await this.alertCtrl.create({
      header: 'Ajustes de apuntamiento',
      message: 'Defina la url a la que apuntará la aplicación. El direccionamiento debe seguir la siguiente nomenclarura: http://servidor/sitio/api/',
      inputs: [
        {
          name: 'URL',
          type: 'url'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.changeEmpCodi(alertData.URL);
          }
        }
      ]
    });
    await alert.present();
  }

  async changeEmpCodi(url: string) {
    console.log(url);
    let alert = await this.alertCtrl.create({
      header: 'Código de empresa',
      message: 'Defina el código de empresa con el cual hará el ingreso',
      inputs: [
        {
          name: 'emp_codi',
          type: 'number'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.emp_codi = alertData.emp_codi;
            console.log(url);
            this.configService.SetDeveloperMode(url, this.emp_codi);
          }
        }
      ]
    });
    await alert.present();
  }
}
