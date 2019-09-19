import { Component, OnInit } from "@angular/core";
import { tecuter } from "../../../models/te/tecuter";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';

@Component({
  selector: "app-tecuter",
  templateUrl: "./tecuter.page.html",
  styleUrls: ["./tecuter.page.scss"]
})
export class TecuterPage implements OnInit {
  tecuter: tecuter[] = [];
  loading=false;
  constructor(private _http: HttpManagerService) {}

  ngOnInit() {
    this.GetTeCuter();
  }

  GetTeCuter(event?: any) {
    this.loading=true;
    this._http.Get<ToTransaction>("/tecuter?").subscribe(resp => {
      this.loading=false;
      this.tecuter = resp.ObjTransaction;
      if (event) event.target.complete();
    });
  }

  doRefresh($event) {
    this.GetTeCuter($event);
  }
}
