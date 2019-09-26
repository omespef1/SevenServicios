import { Component, OnInit, ViewChild } from "@angular/core";
import { gntoper } from "src/app/models/gn/gntoper";
import { PlPfareService } from "../../../services/pl/plpfare.service";
import { AlertComponent } from "../../../components/alert/alert.component";
import { PlinfarService } from "../../../services/pl/plinfar.service";
import { TOAccess } from "../../../models/general/totransaction";
import { AuthService } from "../../../services/auth/auth.service";
import { plinfar, pldinfa } from "src/app/models/pl/plinfar";
import { Router } from "@angular/router";
import { plcacul } from "../../../models/pl/plcacul";
import { of } from "rxjs";
import { plpfare } from '../../../models/pl/plpfare';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';

@Component({
  selector: "app-plinfar",
  templateUrl: "./plinfar.page.html",
  styleUrls: ["./plinfar.page.scss"]
})
export class PlinfarPage implements OnInit {
  plpfare: plpfare[] = [];
  sede: plpfare;
  user: TOAccess;
  option: plcacul;
  loading = false;
  constructor(
    private _plPfare: PlPfareService,
    private _service: PlinfarService,
    private _auth: AuthService,
    private router: Router,
    private _alertS:AlertService,
    private _sesion:SessionsService
  ) {
    this.user = this._auth.loadUser();

    if (this.router.getCurrentNavigation().extras.state) {
      this.option = this.router.getCurrentNavigation().extras.state.option;
    }
  }
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  ngOnInit() {
    this.GetPlPfare();
  }

  GetPlPfare() {
    this._plPfare.GetPlPfare().subscribe(resp => {
      if (resp.Retorno == 1) {
        this._alert.show(resp.TxtError, "danger");
      }
      this.plpfare = resp.ObjTransaction;
    });
  }

  SetPlInfar() {
    this.loading = true;
    let inscription: plinfar = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      arb_cods: this.sede.arb_codi,
      cli_coda: this.user.objResult.cli_coda,
      top_codi: this.sede.top_insc,
      inf_crm: "N",
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_fech: new Date(),
      inf_icde: "S",
      inf_encv: "S",
      inf_nume: 0,
      inf_pcor: "S",
      detalle: [
        {
          apc_cont: this.option.cac_cont,
          cli_coda: this.user.objResult.cli_coda,
          din_cant: 1,
          din_valo: 0,
          din_taes: "N",
          din_tide: "P",
          din_pvde: 0
        }
      ]
    };
    this._service.SetPlInfar(inscription, this.user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.show(resp.TxtError, "danger");
      } else this._alertS.showAlert('Perfecto!','La inscripción ha sido realizada!')
    });
  }
}
