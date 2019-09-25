import { Component, OnInit, ViewChild } from "@angular/core";
import { dtendep } from "../../../models/dt/dtendep";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: "app-dteendep",
  templateUrl: "./dteendep.page.html",
  styleUrls: ["./dteendep.page.scss"]
})
export class DteendepPage implements OnInit {
  dtendep: dtendep[] = [];
  loading=false;
  @ViewChild(AlertComponent,{static:false}) _alert:AlertComponent;
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
      if(resp.Retorno==1)
      this._alert.show(resp.TxtError,'danger');
    });
  }
  doRefresh($event) {
    this.GetDtEndep($event);
  }
}
