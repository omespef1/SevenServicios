import { Component, OnInit, ViewChild } from "@angular/core";
import { tuplatu } from "../../../models/tu/tuplatu";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AuthService } from "../../../services/auth/auth.service";
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { TuplatuService } from '../../../services/tu/tuplatu.service';
import { gnconex } from '../../../models/gn/gnconex';
import { ConfigService } from "src/app/services/config/config.service";

@Component({
  selector: "app-tuplatu",
  templateUrl: "./tuplatu.page.html",
  styleUrls: ["./tuplatu.page.scss"]
})
export class TuplatuPage implements OnInit {
  tuplatu: tuplatu[] = [];
  loading = false;
  logo: any = 'assets/imgs/logo.png';

  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  constructor(private _service: TuplatuService,
    private configService:ConfigService, private _auth: AuthService) {}

  ngOnInit() {
    this.GetTuPlatu();
    this.GetLogo();
  }

  GetLogo(){
    this.logo =  this.configService.Get().CNX_LOGO;
  }


  GetTuPlatu(event?: any) {
    this.loading = true;
    this._service
      .GetTuPlatu()
      .subscribe(resp => {
        this.tuplatu = resp.ObjTransaction;
        if (event) event.target.complete();
        this.loading = false;
        if(resp.Retorno==1)
        this._alert.show(resp.TxtError,'danger');
      });
  }

  doRefresh($event) {
    this.GetTuPlatu($event);

  }
}
