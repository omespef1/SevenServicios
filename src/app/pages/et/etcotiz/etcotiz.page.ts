import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { etprodu, etdcoti, etcotiz } from '../../../models/et/etcotiz';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AuthService } from '../../../services/auth/auth.service';
import { EtcotizService } from '../../../services/et/etcotiz.service';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etcotiz',
  templateUrl: './etcotiz.page.html',
  styleUrls: ['./etcotiz.page.scss'],
})
export class EtcotizPage implements OnInit {
  @Input() cur_marc;
  textoBuscar = "";
  user: TOAccess;
  loading = false;
  EtProdu: etprodu[] = [];
  EtProdn: etprodu[] = [];
  EtDcoti: etdcoti[] = [];
  length = 0;
  lis_codi = 0;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(private _location: Location,
    public alertCtrl: AlertController,
    private _auth: AuthService,
    private _service: EtcotizService,
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
    this._service.getCursos(user).subscribe((resp: ToTransaction) => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
        return;
      }
      this.EtProdn = resp.ObjTransaction;
      this.appendElements(50);
    });
  }

  appendElements(count: number) {
    let max: number = this.EtProdu.length - 1 + count;
    for (let i = this.EtProdu.length; i <= max; i++) {
      if (this.EtProdu.length < this.EtProdn.length) {
        this.EtProdu.push(this.EtProdn[i]);
      }
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.appendElements(50);
      event.target.complete();
      if (this.EtProdu.length == this.EtProdn.length) {
        event.target.disabled = true;
      }

    }, 500);
  }

  setEtCotiz() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));

    let details: etdcoti[] = [];
    for (let produ of this.EtProdu.filter(b => b.cur_marc == true)) {
      details.push({ cur_codi: produ.cur_codi });
    };

    let cotizaciones: etcotiz = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      cli_coda: this.user.objResult.cli_coda,
      detalle: details
    };

    console.log(cotizaciones);

    this._service.setEtCotiz(cotizaciones, user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      } else {
        this._alert.success('La cotizacion ha sido realizada!');
        this._router.navigateByUrl('tabs/et/etsmenu');
      }
    });
  }
}
