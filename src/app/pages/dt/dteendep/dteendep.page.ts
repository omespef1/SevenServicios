import { Component, OnInit, ViewChild } from "@angular/core";
import { dtendep } from "../../../models/dt/dtendep";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { DtendepService } from '../../../services/dt/dtendep.service';
import { gnconex } from '../../../models/gn/gnconex';
import { ConfigService } from "src/app/services/config/config.service";
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: "app-dteendep",
  templateUrl: "./dteendep.page.html",
  styleUrls: ["./dteendep.page.scss"]
})
export class DteendepPage implements OnInit {
  dtendep: dtendep[] = [];
  loading = false;
  logo: any = 'assets/imgs/logo.png';
  @ViewChild(AlertComponent,{static:false}) _alert:AlertComponent;
  constructor(private _service:DtendepService, private configService:ConfigService,
    private router:Router) {}

  ngOnInit() {
    this.GetDtEndep();
    this.GetLogo();
  }
  GetLogo(){
    this.logo =  this.configService.Get().CNX_LOGO;
  }

  GetDtEndep(event?: any) {
    this.loading=true;
    this._service.GetDtEndep().subscribe(resp => {
      this.loading=false;
      this.dtendep = resp.ObjTransaction;
      if (event) event.target.complete();
      if(resp.Retorno==1)
      this._alert.show(resp.TxtError,'danger');
    });
  }
  doRefresh($event) {
    this.GetDtEndep($event);
  }

  openDtInfar(item:dtendep){
    let params: NavigationExtras = {
      state: {
        dtendep: item
      }
    };
    this.router.navigateByUrl("tabs/dtinfar", params);
  }
}
