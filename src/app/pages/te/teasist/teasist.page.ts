import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { teasist } from "../../../models/te/teasist";
import { TOAccess, ToTransaction } from "../../../models/general/totransaction";
import { TeasistService } from "../../../services/te/teasist.service";
import { SessionsService } from "../../../services/sessions/sessions.service";
import { AuthService } from "../../../services/auth/auth.service";
import { AlertService } from "../../../services/alert/alert.service";
import { TeasistEstuPage } from "../teasist-estu/teasist-estu.page";
import { teapert } from "../../../models/te/teasist";
import { Item } from "../../../models/general/items";
import { Location } from "@angular/common";

@Component({
  selector: "app-teasist",
  templateUrl: "./teasist.page.html",
  styleUrls: ["./teasist.page.scss"],
})
export class TeasistPage implements OnInit {
  asi_desc = "";
  apc_cont = 0;
  asi_cont = 0;
  enableButton = false;
  loading = false;
  user: TOAccess;
  Teapert: teapert[];
  textoBuscar = "";

  constructor(
    public alertCtrl: AlertController,
    private _service: TeasistService,
    private _sesion: SessionsService,
    private _auth: AuthService,
    private _alert: AlertService,
    private _modal: ModalController,
    private _location: Location
  ) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
    this.getAperturas();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Alerta",
      message: mensaje,
      buttons: [
        {
          text: "Ok",
          handler: (blah) => {},
        },
      ],
    });

    await alert.present();
  }

  getAperturas() {
    let itemsSource: Item[] = [];
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user).subscribe((resp: ToTransaction) => {
      this.Teapert = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alert.showAlert("Retorno", resp.TxtError);
      }

      this.loading = false;
      console.log(resp);
    });
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  Salir() {
    this._location.back();
  }

  async marcarAsistencias(TeApert) {
    this.asi_desc = "Apertura del curso: " + TeApert.cut_nomb;
    this.apc_cont = TeApert.apc_cont;
    if (this.apc_cont == 0) {
      this.presentAlert("Por favor seleccione una apertura");
    } else {
      this.loading = true;
      let Asistencias: teasist = {
        emp_codi: this._sesion.GetGnEmpre().emp_codi,
        ter_coda: this.user.objResult.cli_coda,
        apc_cont: this.apc_cont,
        asi_desc: this.asi_desc,
      };

      this._service
        .setTeAsist(Asistencias, this.user)
        .subscribe(async (resp) => {
          if (resp.Retorno == 1) {
            this._alert.showAlert("Retono", resp.TxtError);
          } else {
            this.asi_cont = resp.ObjTransaction.asi_cont;
            const modal = await this._modal.create({
              component: TeasistEstuPage,
              componentProps: {
                asi_cont: this.asi_cont,
              },
            });

            await modal.present();
            await modal.onDidDismiss();
            this._alert.showAlert("Confirmación", "Asistencia creada correctamente");
          }
        });
    }
  }
}