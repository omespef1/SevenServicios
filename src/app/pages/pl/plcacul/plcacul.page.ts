import { Component, OnInit, ViewChild } from "@angular/core";
import { plcacul } from "src/app/models/pl/plcacul";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AlertComponent } from "../../../components/alert/alert.component";
import { Router, NavigationExtras } from "@angular/router";
import { PlcaculService } from '../../../services/pl/plcacul.service';

@Component({
  selector: "app-plcacul",
  templateUrl: "./plcacul.page.html",
  styleUrls: ["./plcacul.page.scss"]
})
export class PlcaculPage implements OnInit {
  plcacul: plcacul[] = [];
  @ViewChild(AlertComponent, { static: false }) _alertC: AlertComponent;
  constructor(private _service:PlcaculService, private router: Router) {}

  ngOnInit() {
    this.GetPlCacul();
  }

  GetPlCacul(event?: any) {
    this._service.GetPlCacul().subscribe(resp => {
      this._alertC.ngOnDestroy();
      this.plcacul = resp.ObjTransaction;
      if (event) event.target.complete();
      if (resp.Retorno == 1) this._alertC.show(resp.TxtError, 'danger');
    });
  }

  doRefresh($event) {
    this.GetPlCacul($event);
  }
  openPlInfar(option:plcacul) {
    let navigationExtras: NavigationExtras = {
      state: {
        option: option
      }
    };
    this.router.navigateByUrl("tabs/pl/plinfar",navigationExtras);
  }
}
