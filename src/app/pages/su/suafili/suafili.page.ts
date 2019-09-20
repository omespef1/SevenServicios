import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { TOAccess, ToTransaction } from "../../../models/general/totransaction";
import { suafili } from "src/app/models/su/suafili";
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: "app-suafili",
  templateUrl: "./suafili.page.html",
  styleUrls: ["./suafili.page.scss"]
})
export class SuafiliPage implements OnInit {
  suAfili: suafili[];
  loading=false;
  @ViewChild(AlertComponent,{'static':false}) _alertC:AlertComponent;
  constructor(private _http: HttpManagerService) {}

  ngOnInit() {
    this.GetSuAfili();
  }

  GetSuAfili() {
    this.loading=true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._http
      .Get(`/suafili?cli_coda=88284896&`).subscribe((resp: ToTransaction) => {
        this.suAfili = resp.ObjTransaction;
        if(resp.Retorno==1){
          this._alertC.show(resp.TxtError,'danger');
        }
        this.loading=false;
       console.log(resp);
      });
  }
}
