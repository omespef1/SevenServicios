import { Component, OnInit, ViewChild } from '@angular/core';
import { Gmplane } from "../../../models/gm/gmplane";
import { ThemeService } from "../../../services/theme/theme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "../../../services/auth/auth.service";
import { ModalController } from "@ionic/angular";
import { GminfarService } from "../../../services/gm/gminfar.service";
import { TOAccess } from "../../../models/general/totransaction";
import { AlertComponent } from "../../../components/alert/alert.component";
import { Router, NavigationExtras } from "@angular/router";
import { GmplaneService } from '../../../services/gm/gmplane.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: "app-gmplane",
  templateUrl: "./gmplane.page.html",
  styleUrls: ["./gmplane.page.scss"]
})
export class GmplanePage implements OnInit {
  loading = false;
  user: TOAccess;
  gmplane: Gmplane[];
  test: false;
  logo: any = 'assets/imgs/logo.png';

  @ViewChild(AlertComponent, { static: false }) _alertC: AlertComponent;
  constructor(
    private theme: ThemeService,
    private sanitizer: DomSanitizer,
    private _auth: AuthService,
    private _modal: ModalController,
    private _gmInfar: GminfarService,
    private router: Router,
    private _service:GmplaneService,
    private configService:ConfigService
  ) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
    // this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
    this.GetGmPlane();
    this.GetLogo();
  }
  GetLogo(){
    this.logo =  this.configService.Get().CNX_LOGO;
  }

  GetGmPlane(event?: any) {
    this.loading = true;

    return this._service.GetGmPlane().subscribe(resp => {
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
  openGmInfar(plan: Gmplane) {
    let params: NavigationExtras = {
      state: {
        gmplane: plan
      }
    };
    this.router.navigateByUrl("tabs/gm/gminfar", params);    
  }

  // toggleAccordion() {
  //   if (this.accordionExapanded) {
  //     this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
  //     this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

  //   } else {
  //     this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "600px");
  //     this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");

  //   }

  //   this.accordionExapanded = !this.accordionExapanded;
  //   // this.icon = this.icon == "eye-off" ? "eye" : "eye-off";

  // }

  


}
