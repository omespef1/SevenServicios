import { Component, OnInit, ViewChild } from "@angular/core";
import { tecuter } from "../../../models/te/tecuter";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AlertComponent } from "src/app/components/alert/alert.component";
import { Router, NavigationExtras } from '@angular/router';
import { TecuterService } from '../../../services/te/tecuter.service';

@Component({
  selector: "app-tecuter",
  templateUrl: "./tecuter.page.html",
  styleUrls: ["./tecuter.page.scss"]
})
export class TecuterPage implements OnInit {
  tecuter: tecuter[] = [];
  loading = false;
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  constructor(private _service:TecuterService,private router:Router) {}

  ngOnInit() {
    this.GetTeCuter();
  }

  GetTeCuter(event?: any) {    
    this.loading = true;
    this._service.GeTeCuter().subscribe(resp => {
      this.loading = false;
      this.tecuter = resp.ObjTransaction;
      if (event) event.target.complete();
      if (resp.Retorno == 1) this._alert.show(resp.TxtError, "danger");
    });
  }

  doRefresh($event) {
    this.GetTeCuter($event);
  }

  openTeInfar(option:tecuter) {
    let navigationExtras: NavigationExtras = {
      state: {
        option: option
      }
    };
    this.router.navigateByUrl("tabs/te/teinfar", navigationExtras);
  }
}
