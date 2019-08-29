import { Component, OnInit } from "@angular/core";
import { HttpEvent } from "@angular/common/http";
import { ToTransaction } from "src/app/models/general/totransaction";
import { Gmplane } from '../../../models/gm/gmplane';
import { ThemeService } from '../../../services/theme/theme.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: "app-gmplane",
  templateUrl: "./gmplane.page.html",
  styleUrls: ["./gmplane.page.scss"]
})
export class GmplanePage implements OnInit {
  constructor(private _http: AuthService,private theme:ThemeService,private sanitizer: DomSanitizer) {}
  gmplane:Gmplane[];

  items = [
    { text: 'My first green item', color: '#00ff00' },
    { text: 'My second red item', color: '#ff0000' },
    { text: 'My third blue item', color: '#0000ff' }
  ];
  ngOnInit() {
    this.GetGmPlane();
  }

  GetGmPlane() {
   this._http.Get<ToTransaction>("/gmplane").subscribe((resp)=>{
     console.log(resp);
      this.gmplane = resp.ObjTransaction;
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
}
