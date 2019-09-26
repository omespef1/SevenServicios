import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { loginRequest } from "../../models/general/totransaction";
import { AlertService } from "../../services/alert/alert.service";
import { NavController, ModalController } from '@ionic/angular';
import { SessionsService } from '../../services/sessions/sessions.service';
import { GnemprePage } from '../gn/gnempre/gnempre.page';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  showPass=false;
  user: loginRequest = new loginRequest();
  constructor(
    private auth: AuthService,
    private _alert: AlertService,
    private _nav: NavController,
    private router:Router,
    private _sesion:SessionsService,
    private _modal:ModalController
  ) {}

  ngOnInit() {

    
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
    },err=> {
      this.loading=false;
      this._alert.showAlert('Error',err);
    });
  }

  facebook(){

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
  // signIn(){
  //   this.loading=true;
  //   setTimeout(() => {
  //     this.loading=false;
  //   }, 5000);
  // }
}
