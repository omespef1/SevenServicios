import { Component, OnInit } from "@angular/core";
import { dtendep } from "../../../models/dt/dtendep";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';

@Component({
  selector: "app-dteendep",
  templateUrl: "./dteendep.page.html",
  styleUrls: ["./dteendep.page.scss"]
})
export class DteendepPage implements OnInit {
  dtendep: dtendep[] = [];
  loading=false;
  constructor(private _http: HttpManagerService) {}

  ngOnInit() {
    this.GetDtEndep();
  }

  GetDtEndep(event?: any) {
    this.loading=true;
    this._http.Get<ToTransaction>("/dtendep?").subscribe(resp => {
      this.loading=false;
      this.dtendep = resp.ObjTransaction;
      if (event) event.target.complete();
    });
  }
  doRefresh($event) {
    this.GetDtEndep($event);
  }
}
