import { Component, OnInit, ViewChild } from "@angular/core";
import { tuplatu } from "../../../models/tu/tuplatu";
import { ToTransaction } from "../../../models/general/totransaction";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { AuthService } from "../../../services/auth/auth.service";
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { TuplatuService } from '../../../services/tu/tuplatu.service';

@Component({
  selector: "app-tuplatu",
  templateUrl: "./tuplatu.page.html",
  styleUrls: ["./tuplatu.page.scss"]
})
export class TuplatuPage implements OnInit {
  tuplatu: tuplatu[] = [];
  loading = false;
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  constructor(private _service: TuplatuService, private _auth: AuthService) {}

  ngOnInit() {
    this.GetTuPlatu();
  }

  GetTuPlatu(event?: any) {
    this.loading = true;
    this._service
      .GetTuPlatu()
      .subscribe(resp => {
        this.tuplatu = resp.ObjTransaction;
        if (event) event.target.complete();
        this.loading = false;
        if(resp.Retorno==1)
        this._alert.show(resp.TxtError,'danger');
      });
  }

  doRefresh($event) {
    this.GetTuPlatu($event);

  }
}
