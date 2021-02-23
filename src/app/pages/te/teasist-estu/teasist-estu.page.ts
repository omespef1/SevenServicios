import { Component, Input, OnInit } from "@angular/core";
import { teasise } from "../../../models/te/teasist";
import { TOAccess, ToTransaction } from "../../../models/general/totransaction";
import { TeasistService } from "../../../services/te/teasist.service";
import { AlertService } from "../../../services/alert/alert.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-teasist-estu",
  templateUrl: "./teasist-estu.page.html",
  styleUrls: ["./teasist-estu.page.scss"],
})
export class TeasistEstuPage implements OnInit {
  @Input() asi_cont;
  loading = false;
  user: TOAccess;
  Teasise: teasise[];
  textoBuscar = "";

  constructor(
    private _service: TeasistService,
    private _alert: AlertService,
    private _modal: ModalController
  ) {}

  ngOnInit() {
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service
      .getEstudiantes(user, this.asi_cont)
      .subscribe((resp: ToTransaction) => {
        if (resp.Retorno == 1) {
          this._alert.showAlert("Retorno", resp.TxtError);
          this.CerrarModal();
        } else {
          this.Teasise = resp.ObjTransaction;
        }
      });
  }

  setAplicar() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service
      .MarcarAsist(
        user,
        this.Teasise.filter((b) => b.das_asis == true)
      )
      .subscribe((resp: ToTransaction) => {
        if (resp.Retorno == 1) {
          this._alert.showAlert("Retorno", resp.TxtError);
        } else {
          this._service
            .CambiarEstado(user, this.asi_cont, "A")
            .subscribe((resp: ToTransaction) => {
              if (resp.Retorno == 1) {
                this._alert.showAlert("Retorno", resp.TxtError);
              } else {
                this.CerrarModal();
              }
            });
        }
      });
  }

  CerrarModal() {
    this._modal.dismiss();
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }
}
