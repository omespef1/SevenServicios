import { Component, OnInit, ViewChild } from "@angular/core";
import { gnempre } from '../../../models/gn/gnempre';
import { ModalController } from "@ionic/angular";
import { GnempreService } from "../../../services/gn/gnempre.service";
import { AlertComponent } from "../../../components/alert/alert.component";

@Component({
  selector: "app-gnempre",
  templateUrl: "./gnempre.page.html",
  styleUrls: ["./gnempre.page.scss"]
})
export class GnemprePage implements OnInit {
  businessList: gnempre[] = [];
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  constructor(
    private _modal: ModalController,
    private _service: GnempreService
  ) {}

  ngOnInit() {
    this.GetGnEmpre();
  }

  GetGnEmpre() {
    this._service.GetGnEmpre().subscribe(resp => {
      if (resp.Retorno == 0) {
        this.businessList = resp.ObjTransaction;
      } else {
        this._alert.show(resp.TxtError, "danger");
      }
    });
  }

  async SetBusiness(business: gnempre) {
    await this._modal.dismiss(business);
  }
}
