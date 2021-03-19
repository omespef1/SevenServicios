import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { gmprodu, gmdcoti, gmcotiz } from '../../../models/gm/gmcotiz';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { Router } from '@angular/router';
import { GmcotizService } from '../../../services/gm/gmcotiz.service';

@Component({
  selector: 'app-gmcotiz',
  templateUrl: './gmcotiz.page.html',
  styleUrls: ['./gmcotiz.page.scss'],
})
export class GmcotizPage implements OnInit {
  @Input() cur_marc;
  textoBuscar = "";
  user: TOAccess;
  loading = false;
  GmProdu: gmprodu[] = [];
  GmProdn: gmprodu[] = [];
  GmDcoti: gmdcoti[] = [];
  length = 0;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(private _location: Location,
    public alertCtrl: AlertController,
    private _auth: AuthService,
    private _service: GmcotizService,
    private _alert: AlertService,
    private _sesion: SessionsService,
    private _router: Router) {
      this.user = this._auth.loadUser();
     }

  ngOnInit() {
    this.getCursos();
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  Salir() {
    this._location.back();
  }

  getCursos() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getPlanes(user).subscribe((resp: ToTransaction) => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
        return;
      }
      this.GmProdn = resp.ObjTransaction;
      this.appendElements(50);
    });
  }

  appendElements(count: number) {
    let max: number = this.GmProdu.length - 1 + count;
    for (let i = this.GmProdu.length; i <= max; i++) {
      if (this.GmProdu.length < this.GmProdn.length) {
        this.GmProdu.push(this.GmProdn[i]);
      }
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.appendElements(50);
      event.target.complete();
      if (this.GmProdu.length == this.GmProdn.length) {
        event.target.disabled = true;
      }

    }, 500);
  }

  setGmCotiz() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));

    let details: gmdcoti[] = [];
    for (let produ of this.GmProdu.filter(b => b.pla_marc == true)) {
      details.push({ pla_cont: produ.pla_cont });
    };

    let cotizaciones: gmcotiz = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      cli_coda: this.user.objResult.cli_coda,
      detalle: details
    };

    console.log(cotizaciones);

    this._service.setGmCotiz(cotizaciones, user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      } else {
        this._alert.success('La cotizacion ha sido realizada!');
        this._router.navigateByUrl('tabs/gm/gmsmenu');
      }
    });
  }
}
