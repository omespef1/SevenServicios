import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { suafili } from "src/app/models/su/suafili";
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { SuafiliService } from '../../../services/su/suafili.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: "app-suafili",
  templateUrl: "./suafili.page.html",
  styleUrls: ["./suafili.page.scss"]
})
export class SuafiliPage implements OnInit {
  suAfili: suafili[];
  loading=false;
  user:TOAccess;
  @ViewChild(AlertComponent,{'static':false}) _alertC:AlertComponent;
  constructor(private _service:SuafiliService,private auth:AuthService) {
    this.user = this.auth.loadUser();
  }

  ngOnInit() {
    this.GetSuAfili();
  }

  GetSuAfili() {
    this.loading=true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service
      .GetSuAfili(user).subscribe((resp: ToTransaction) => {
        this.suAfili = resp.ObjTransaction;
        if(resp.Retorno==1){
          this._alertC.show(resp.TxtError,'danger');
        }
        this.loading=false;
       console.log(resp);
      });
  }
}
