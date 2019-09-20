import { Component, OnInit } from "@angular/core";
import { tuplatu } from "../../../models/te/tuplatu";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-tuplatu",
  templateUrl: "./tuplatu.page.html",
  styleUrls: ["./tuplatu.page.scss"]
})
export class TuplatuPage implements OnInit {
  tuplatu: tuplatu[] = [];
  loading = false;
  constructor(private _http: HttpManagerService, private _auth: AuthService) {}

  ngOnInit() {
    this.GetTuPlatu();
  }

  GetTuPlatu(event?: any) {
    this.loading = true;
    this._http
      .Get<ToTransaction>("/tuplatu?")
      .subscribe(resp => {
        this.tuplatu = resp.ObjTransaction;
        if (event) event.target.complete();
        this.loading = false;
      });
  }

  doRefresh($event) {
    this.GetTuPlatu($event);

  }
}
