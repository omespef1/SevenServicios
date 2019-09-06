import { Component, OnInit } from "@angular/core";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { TOAccess, ToTransaction } from "../../../models/general/totransaction";
import { suafili } from "src/app/models/su/suafili";

@Component({
  selector: "app-suafili",
  templateUrl: "./suafili.page.html",
  styleUrls: ["./suafili.page.scss"]
})
export class SuafiliPage implements OnInit {
  suAfili: suafili[];
  constructor(private _http: HttpManagerService) {}

  ngOnInit() {
    this.GetSuAfili();
  }

  GetSuAfili() {
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._http
      .Get(`/suafili?cli_coda=88284896&`).subscribe((resp: ToTransaction) => {
        this.suAfili = resp.ObjTransaction;
       console.log(resp);
      });
  }
}
