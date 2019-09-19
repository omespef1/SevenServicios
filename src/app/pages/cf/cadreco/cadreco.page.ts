import { Component, OnInit, Input } from "@angular/core";
import { caregob } from "../../../models/cf/cfregob";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-cadreco",
  templateUrl: "./cadreco.page.html",
  styleUrls: ["./cadreco.page.scss"]
})
export class CadrecoPage implements OnInit {
  @Input() cfregob: caregob = new caregob();
  constructor(private _modal: ModalController) {}

  ngOnInit() {
    console.log(this.cfregob);
  }
  closeModal() {
    this._modal.dismiss();
  }
}
