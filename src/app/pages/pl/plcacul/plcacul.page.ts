import { Component, OnInit } from "@angular/core";
import { plcacul } from "src/app/models/pl/plcacul";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';

@Component({
  selector: "app-plcacul",
  templateUrl: "./plcacul.page.html",
  styleUrls: ["./plcacul.page.scss"]
})
export class PlcaculPage implements OnInit {
  plcacul: plcacul[] = [];
  constructor(private _http: HttpManagerService) {}

  ngOnInit() {
    this.GetPlCacul();
  }

  GetPlCacul(event?: any) {
    this._http.Get<ToTransaction>("/plcacul?").subscribe(resp => {
      this.plcacul = resp.ObjTransaction;
      if (event) event.target.complete();
    });
  }

  doRefresh($event) {
    this.GetPlCacul($event);
  }
}
