import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from "@angular/common";
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';
import { DtcotizService } from '../../../services/dt/dtcotiz.service';
import { dtprodu, dtcotiz, dtdcoti } from '../../../models/dt/dtcotiz';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dtcotiz',
  templateUrl: './dtcotiz.page.html',
  styleUrls: ['./dtcotiz.page.scss'],
})
export class DtcotizPage implements OnInit {
  @Input() pro_marc;
  textoBuscar = "";
  user: TOAccess;
  loading = false;
  DtProdu: dtprodu[] = [];
  DtProdn: dtprodu[] = [];
  DtDcoti: dtdcoti[] = [];
  length = 0;
  lis_codi = 0;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(private _location: Location,
    public alertCtrl: AlertController,
    private _auth: AuthService,
    private _service: DtcotizService,
    private _alert: AlertService,
    private _sesion: SessionsService,
    private _router: Router) {
    this.user = this._auth.loadUser();
  }

  ngOnInit() {
    this.getLisCodi();
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  Salir() {
    this._location.back();
  }

  getLisCodi() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getLisCodi(user).subscribe((resp: ToTransaction) => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
        return;
      }
      else {
        this.lis_codi = resp.ObjTransaction.lis_codi;

        this.getProductos(this.lis_codi);
      }
    });
  }

  getProductos(lis_codi: number) {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getProductos(user, lis_codi).subscribe((resp: ToTransaction) => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
        return;
      }
      this.DtProdn = resp.ObjTransaction;
      this.appendElements(50);
    });
  }

  appendElements(count: number) {
    let max: number = this.DtProdu.length - 1 + count;
    for (let i = this.DtProdu.length; i <= max; i++) {
      if (this.DtProdu.length < this.DtProdn.length) {
        this.DtProdu.push(this.DtProdn[i]);
      }
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.appendElements(50);
      event.target.complete();
      if (this.DtProdu.length == this.DtProdn.length) {
        event.target.disabled = true;
      }

    }, 500);
  }

  setDtCotiz() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));

    let details: dtdcoti[] = [];
    for (let produ of this.DtProdu.filter(b => b.pro_marc == true)) {
      details.push({ pro_codi: produ.pro_codi });
    };

    let cotizaciones: dtcotiz = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      cli_coda: this.user.objResult.cli_coda,
      detalle: details
    };

    console.log(cotizaciones);

    this._service.setDtCotiz(cotizaciones, user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      } else {
        this._alert.success('La inscripción ha sido realizada!');
        this._router.navigateByUrl('tabs/dt/dtsmenu');
      }
    });
  }
}
