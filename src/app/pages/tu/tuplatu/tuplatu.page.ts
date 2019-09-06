import { Component, OnInit } from "@angular/core";
import { tuplatu } from "../../../models/te/tuplatu";
import { ToTransaction } from "../../../models/general/totransaction";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-tuplatu",
  templateUrl: "./tuplatu.page.html",
  styleUrls: ["./tuplatu.page.scss"]
})
export class TuplatuPage implements OnInit {
  tuplatu: tuplatu[] = [];
  constructor(private _http: AuthService) {}

  ngOnInit() {
    this.GetTuPlatu();
  }

  GetTuPlatu(event?: any) {
    this._http.Get<ToTransaction>("/tuplatu?").subscribe(resp => {
      this.tuplatu = resp.ObjTransaction;
      if (event) event.target.complete();
    });
  }

  doRefresh($event) {
    this.GetTuPlatu($event);
  }
}
