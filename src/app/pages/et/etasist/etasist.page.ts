import { Component, OnInit } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { EtRinho, EtAsist } from '../../../models/et/etasist';
import { AlertController, ModalController } from '@ionic/angular';
import { EtasistService } from '../../../services/et/etasist.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Location } from "@angular/common";
import { EtasistEstuPage } from '../etasist-estu/etasist-estu.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etasist',
  templateUrl: './etasist.page.html',
  styleUrls: ['./etasist.page.scss'],
})
export class EtasistPage implements OnInit {
  asi_desc = "";
  cur_cont = 0;
  rin_grup = 0;
  ite_cont = 0;
  asi_cont = 0;
  rin_cont = 0;
  loading = false;
  user: TOAccess;
  etrinho: EtRinho;
  textoBuscar = "";

  constructor(public alertCtrl: AlertController,
    private _service: EtasistService,
    private _sesion: SessionsService,
    private _auth: AuthService,
    private _alert: AlertService,
    private _location: Location,
    private _modal: ModalController,
    private _router: Router) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
    this.getAperturas();
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user).subscribe((resp: ToTransaction) => {
      this.etrinho = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
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

  async marcarAsistencias(etRinho) {
    this.asi_desc = "Asistencia del curso : " + etRinho.cur_nomb;
    this.cur_cont = etRinho.cur_cont;
    this.rin_grup = etRinho.rin_grup;
    this.ite_cont = etRinho.ite_cont;
    this.rin_cont = etRinho.rin_cont;
    if (this.cur_cont == 0) {
      this._alert.error("Por favor seleccione un curso");
    } else {
      this.loading = true;
      let Asistencias: EtAsist = {
        emp_codi: this._sesion.GetGnEmpre().emp_codi,
        ter_coda: this.user.objResult.cli_coda,
        cur_cont: this.cur_cont,
        asi_desc: this.asi_desc,
        rin_grup: this.rin_grup,
        ite_cont: this.ite_cont,
        rin_cont: this.rin_cont
      };

      this._service
        .setEtAsist(Asistencias, this.user)
        .subscribe(async (resp) => {
          if (resp.Retorno == 1) {
            this._alert.error(resp.TxtError);
          } else {
            console.log(resp.ObjTransaction);
            this.asi_cont = resp.ObjTransaction.asi_cont;
            const modal = await this._modal.create({
              component: EtasistEstuPage,
              componentProps: {
                asi_cont: this.asi_cont,
              },
            });

            await modal.present();
            await modal.onDidDismiss().then(data => {
              if (data.data.dismissvalue == false) {
                this._service.EliminarEtAsis(this.user, this.asi_cont).subscribe((resp: ToTransaction) => {
                  if (resp.Retorno == 1) {
                    this._alert.error(resp.TxtError);
                  }
                  this.loading = false;
                  console.log(resp);
                });
                this._router.navigateByUrl('tabs/et/etsmenu');
              }
              else {
                this._alert.success("Asistencia creada correctamente");
                this._router.navigateByUrl('tabs/et/etsmenu');
              }
            });
          }
        });
    }
  }
}
