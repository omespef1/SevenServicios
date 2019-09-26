import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertComponent } from "src/app/components/alert/alert.component";
import { TePfareService } from "../../../services/te/tepfare.service";
import { TeInfarService } from "../../../services/te/teinfar.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { tepfare } from "src/app/models/te/tepfare";
import { TOAccess } from "src/app/models/general/totransaction";
import { tecuter } from "src/app/models/te/tecuter";
import { teinfar } from "src/app/models/te/teinfar";
import { AlertService } from '../../../services/alert/alert.service';
import { SessionsService } from '../../../services/sessions/sessions.service';

@Component({
  selector: "app-teinfar",
  templateUrl: "./teinfar.page.html",
  styleUrls: ["./teinfar.page.scss"]
})
export class TeinfarPage implements OnInit {
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  tepfare: tepfare[] = [];
  sede: tepfare;
  user: TOAccess;
  option: tecuter;
  loading = false;
  constructor(
    private _TePfare: TePfareService,
    private _service: TeInfarService,
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

  ngOnInit() {
    this.GetTePfare();
  }

  GetTePfare() {
    this._TePfare.GetTePfare().subscribe(resp => {
      if (resp.Retorno == 1) {
        this._alert.show(resp.TxtError, "danger");
      }
      this.tepfare = resp.ObjTransaction;
    });
  }

  SetTeInfar() {
    this.loading = true;
    let inscription: teinfar = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      arb_cods: this.sede.arb_codi,
      cli_coda: this.user.objResult.cli_coda,
      top_codi: this.sede.top_insc,
      inf_crm: "N",
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_fech: new Date(),
      inf_icde: "S",
      inf_envc: "S",
      inf_nume: 0,
      inf_pcor: "S",
      detalle: [
        {
          apc_cont: this.option.cut_cont,
          din_cant: 1,
          din_valo: 0,
          din_taes: "N",
          din_tide: "P",
          din_pvde: 0
        }
      ]
    };
    this._service.SetTeInfar(inscription, this.user).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno == 1) {
        this._alert.show(resp.TxtError, "danger");
      } else{
        this._alertS.showAlert('Perfecto!','La inscripción ha sido realizada!');
        this.router.navigateByUrl('tabs/te/tecuter');
      } 
    });
  }
}
