import { Component, OnInit } from "@angular/core";
import { HttpEvent } from "@angular/common/http";
import { ToTransaction } from "src/app/models/general/totransaction";
import { Gmplane } from "../../../models/gm/gmplane";
import { ThemeService } from "../../../services/theme/theme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AuthService } from "../../../services/auth/auth.service";
import { ModalController, AlertController } from '@ionic/angular';
import { GntoperPage } from "../../gn/gntoper/gntoper.page";
import { AlertService } from '../../../services/alert/alert.service';
import { GminfarService } from '../../../services/gm/gminfar.service';
import { gminfar } from '../../../models/gm/gminfar';
import { gntoper } from '../../../models/gn/gntoper';
import { TOAccess } from '../../../models/general/totransaction';

@Component({
  selector: "app-gmplane",
  templateUrl: "./gmplane.page.html",
  styleUrls: ["./gmplane.page.scss"]
})
export class GmplanePage implements OnInit {
  loading = false;
  user:TOAccess;
  gmplane: Gmplane[];
  constructor(
    private _http: HttpManagerService,
    private theme: ThemeService,
    private sanitizer: DomSanitizer,
    private _auth: AuthService,
    private _modal: ModalController,
    private _alert:AlertService,
    private _gmInfar:GminfarService
  ) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
    this.GetGmPlane();
  }

  GetGmPlane(event?: any) {
    this.loading = true;
    console.log(this._auth.loadUser().strToken);
    return this._http
      .Get<ToTransaction>("/gmplane?", this._auth.loadUser().strToken)
      .subscribe(resp => {
        console.log(resp);
        this.loading = false;
        this.gmplane = resp.ObjTransaction;
        if (event) event.target.complete();
      });
  }

  enableDark() {
    this.theme.enableDark();
  }

  enableLight() {
    this.theme.enableLight();
  }
  getDynamicColor(color) {
    return this.sanitizer.bypassSecurityTrustStyle(`--myvar: ${color}`);
  }

  doRefresh($event) {
    this.GetGmPlane($event);
  }
  async OpenGnToper() {
    const modal = await this._modal.create({
      component: GntoperPage
    });

    modal.onWillDismiss().then((resp) => {
      console.log(resp.data);
      let gntoper:gntoper = resp.data;
      let gminfar:gminfar = { 
        emp_codi: 1,
        top_codi: gntoper.top_codi, 
        inf_fech:new Date(),
        cli_coda : this.user.objResult.cli_coda,
        inf_nume:0,
        arb_cods: gntoper.arb_codi,
        inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
        inf_envc:"N",
        inf_icrm:"N",
        inf_pcor:"N",
        inf_icde:"S"      
      }      
      this.SetGmInfar(gminfar);
    });
    return await modal.present();
  }


  SetGmInfar(gminfar:gminfar){
      this._alert.showAlertConfirm('¿Estás seguro de realizar esta inscripción?','Confirmar inscripción').then((resp:boolean)=>{
            if(resp){
                //realizar la inscripción llamando al servicio de GmInfar
              this._gmInfar.SetGmInfar(gminfar)
            }
      })
  }
}
