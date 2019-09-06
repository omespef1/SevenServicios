import { Component, OnInit } from "@angular/core";
import { HttpEvent } from "@angular/common/http";
import { ToTransaction } from "src/app/models/general/totransaction";
import { Gmplane } from "../../../models/gm/gmplane";
import { ThemeService } from "../../../services/theme/theme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-gmplane",
  templateUrl: "./gmplane.page.html",
  styleUrls: ["./gmplane.page.scss"]
})
export class GmplanePage implements OnInit {
  loading=false;
  constructor(
    private _http: AuthService,
    private theme: ThemeService,
    private sanitizer: DomSanitizer

  ) {}
  gmplane: Gmplane[];

  ngOnInit() {
    this.GetGmPlane();
  }

  GetGmPlane(event?: any) {
    this.loading=true;
    return this._http.Get<ToTransaction>("/gmplane?").subscribe(resp => {
      console.log(resp);
      this.loading=false;
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
}
