import { Component, OnInit } from "@angular/core";
import { dtendep } from "../../../models/dt/dtendep";
import { ToTransaction } from "../../../models/general/totransaction";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-dteendep",
  templateUrl: "./dteendep.page.html",
  styleUrls: ["./dteendep.page.scss"]
})
export class DteendepPage implements OnInit {
  dtendep: dtendep[] = [];
  constructor(private _http: AuthService) {}

  ngOnInit() {
    this.GetDtEndep();
  }

  GetDtEndep(event?: any) {
    this._http.Get<ToTransaction>("/dtendep").subscribe(resp => {
      this.dtendep = resp.ObjTransaction;
      if (event) event.target.complete();
    });
  }
  doRefresh($event) {
    this.GetDtEndep($event);
  }
}
