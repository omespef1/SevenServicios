import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { teprodu, tedcoti, tecotiz } from '../../../models/te/tecotiz';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AuthService } from '../../../services/auth/auth.service';
import { TecotizService } from '../../../services/te/tecotiz.service';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecotiz',
  templateUrl: './tecotiz.page.html',
  styleUrls: ['./tecotiz.page.scss'],
})
export class TecotizPage implements OnInit {
  @Input() cut_marc;
  textoBuscar = "";
  user: TOAccess;
  loading = false;
  TeProdu: teprodu[] = [];
  TeProdn: teprodu[] = [];
  TeDcoti: tedcoti[] = [];
  length = 0;
  lis_codi = 0;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(private _location: Location,
    public alertCtrl: AlertController,
    private _auth: AuthService,
    private _service: TecotizService,
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
      this.TeProdn = resp.ObjTransaction;
      this.appendElements(50);
    });
  }

  appendElements(count: number) {
    let max: number = this.TeProdu.length - 1 + count;
    for (let i = this.TeProdu.length; i <= max; i++) {
      if (this.TeProdu.length < this.TeProdn.length) {
        this.TeProdu.push(this.TeProdn[i]);
      }
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.appendElements(50);
      event.target.complete();
      if (this.TeProdu.length == this.TeProdn.length) {
        event.target.disabled = true;
      }

    }, 500);
  }

  setTeCotiz() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));

    let details: tedcoti[] = [];
    for (let produ of this.TeProdu.filter(b => b.cut_marc == true)) {
      details.push({ apc_cont: produ.apc_cont });
    };

    let cotizaciones: tecotiz = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      cli_coda: this.user.objResult.cli_coda,
      detalle: details
    };

    console.log(cotizaciones);

    this._service.setTeCotiz(cotizaciones, user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      } else {
        this._alert.success('La cotizacion ha sido realizada!');
        this._router.navigateByUrl('tabs/te/tesmenu');
      }
    });
  }
}
