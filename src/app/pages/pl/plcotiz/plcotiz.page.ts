import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { plprodu, pldcoti, plcotiz } from '../../../models/pl/plcotiz';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AuthService } from '../../../services/auth/auth.service';
import { PlcotizService } from '../../../services/pl/plcotiz.service';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plcotiz',
  templateUrl: './plcotiz.page.html',
  styleUrls: ['./plcotiz.page.scss'],
})
export class PlcotizPage implements OnInit {
  @Input() cur_marc;
  textoBuscar = "";
  user: TOAccess;
  loading = false;
  PlProdu: plprodu[] = [];
  PlProdn: plprodu[] = [];
  PlDcoti: pldcoti[] = [];
  length = 0;
  lis_codi = 0;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(private _location: Location,
    public alertCtrl: AlertController,
    private _auth: AuthService,
    private _service: PlcotizService,
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
      this.PlProdn = resp.ObjTransaction;
      this.appendElements(50);
    });
  }

  appendElements(count: number) {
    let max: number = this.PlProdu.length - 1 + count;
    for (let i = this.PlProdu.length; i <= max; i++) {
      if (this.PlProdu.length < this.PlProdn.length) {
        this.PlProdu.push(this.PlProdn[i]);
      }
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.appendElements(50);
      event.target.complete();
      if (this.PlProdu.length == this.PlProdn.length) {
        event.target.disabled = true;
      }

    }, 500);
  }

  setPlCotiz() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));

    let details: pldcoti[] = [];
    for (let produ of this.PlProdu.filter(b => b.cac_marc == true)) {
      details.push({ cac_codi: produ.cac_codi });
    };

    let cotizaciones: plcotiz = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      cli_coda: this.user.objResult.cli_coda,
      detalle: details
    };

    console.log(cotizaciones);

    this._service.setPlCotiz(cotizaciones, user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      } else {
        this._alert.success('La cotizacion ha sido realizada!');
        this._router.navigateByUrl('tabs/pl/plsmenu');
      }
    });
  }
}
