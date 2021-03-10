import { Component, OnInit } from "@angular/core";
import { TOAccess, ToTransaction } from "../../../models/general/totransaction";
import { AlertController, ModalController } from "@ionic/angular";
import { DtasistService } from "../../../services/dt/dtasist.service";
import { SessionsService } from "../../../services/sessions/sessions.service";
import { AuthService } from "../../../services/auth/auth.service";
import { AlertService } from "../../../services/alert/alert.service";
import { dtapert, dtasist, dtasise } from '../../../models/dt/dtasist';
import { Location } from "@angular/common";
import { DtasistEstuPage } from "../dtasist-estu/dtasist-estu.page";
import { Router } from '@angular/router';

@Component({
  selector: "app-dtasist",
  templateUrl: "./dtasist.page.html",
  styleUrls: ["./dtasist.page.scss"],
})
export class DtasistPage implements OnInit {
  asi_desc = "";
  equ_cont = 0;
  asi_cont = 0;
  loading = false;
  user: TOAccess;
  DtApert: dtapert[];
  textoBuscar = "";

  constructor(
    public alertCtrl: AlertController,
    private _service: DtasistService,
    private _sesion: SessionsService,
    private _auth: AuthService,
    private _alert: AlertService,
    private _location: Location,
    private _modal: ModalController,
    private _router: Router
  ) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
    this.getAperturas();
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user).subscribe((resp: ToTransaction) => {
      this.DtApert = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alert.showAlert("Retono", resp.TxtError);
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

  async marcarAsistencias(DtApert) {
    this.asi_desc = "Asistencia del curso equipo : " + DtApert.equ_nomb;
    this.equ_cont = DtApert.equ_cont;
    if (this.equ_cont == 0) {
      this._alert.error("Por favor seleccione una apertura");
    } else {  
      this.loading = true;
      let Asistencias: dtasist = {
        emp_codi: this._sesion.GetGnEmpre().emp_codi,
        ter_coda: this.user.objResult.cli_coda,
        equ_cont: this.equ_cont,
        asi_desc: this.asi_desc,
      };      
      
      this._service
        .setDtAsist(Asistencias, this.user)
        .subscribe(async (resp) => {
          if (resp.Retorno == 1) {
            this._alert.error(resp.TxtError);
          } else {
            this.asi_cont = resp.ObjTransaction.asi_cont;
            const modal = await this._modal.create({
              component: DtasistEstuPage,
              componentProps: {
                asi_cont: this.asi_cont,
              },
            });

            await modal.present();
            await modal.onDidDismiss();
            this._alert.success("Asistencia creada correctamente");
            this._router.navigateByUrl('tabs/dt/dtsmenu');
          }
        });
    }
  }
}
