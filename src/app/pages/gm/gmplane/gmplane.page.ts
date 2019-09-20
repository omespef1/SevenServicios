import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpEvent } from "@angular/common/http";
import { ToTransaction } from "src/app/models/general/totransaction";
import { Gmplane } from "../../../models/gm/gmplane";
import { ThemeService } from "../../../services/theme/theme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AuthService } from "../../../services/auth/auth.service";
import { ModalController, AlertController } from "@ionic/angular";
import { GntoperPage } from "../../gn/gntoper/gntoper.page";
import { AlertService } from "../../../services/alert/alert.service";
import { GminfarService } from "../../../services/gm/gminfar.service";
import { gminfar } from "../../../models/gm/gminfar";
import { gntoper } from "../../../models/gn/gntoper";
import { TOAccess } from "../../../models/general/totransaction";
import { AlertComponent } from "../../../components/alert/alert.component";

@Component({
  selector: "app-gmplane",
  templateUrl: "./gmplane.page.html",
  styleUrls: ["./gmplane.page.scss"]
})
export class GmplanePage implements OnInit {
  loading = false;
  user: TOAccess;
  gmplane: Gmplane[];
  @ViewChild(AlertComponent, { static: false }) _alertC: AlertComponent;
  constructor(
    private _http: HttpManagerService,
    private theme: ThemeService,
    private sanitizer: DomSanitizer,
    private _auth: AuthService,
    private _modal: ModalController,
    private _gmInfar: GminfarService
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
        this._alertC.ngOnDestroy();
        console.log(resp);
        this.loading = false;
        this.gmplane = resp.ObjTransaction;
        if (event) event.target.complete();
        if (resp.Retorno == 1) this._alertC.show(resp.TxtError, "danger");
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
    //this._gmInfar.SetGmInfar(null)
    this.GetGmPlane($event);
  }
  async OpenGnToper(plan: Gmplane) {
    const modal = await this._modal.create({
      component: GntoperPage,
      componentProps: { plan: plan }
    });
    return await modal.present();
  }
}
