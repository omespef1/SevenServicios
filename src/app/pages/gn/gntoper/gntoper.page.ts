import { Component, OnInit, ViewChild } from "@angular/core";
import { GntoperService } from "../../../services/gn/gntoper.service";
import { gntoper } from "../../../models/gn/gntoper";
import { ModalController, NavParams } from "@ionic/angular";
import { GminfarService } from "../../../services/gm/gminfar.service";
import { gminfar, gmdinfa } from "../../../models/gm/gminfar";
import { Alert } from "selenium-webdriver";
import { AlertService } from "../../../services/alert/alert.service";
import { TOAccess } from "src/app/models/general/totransaction";
import { AuthService } from "../../../services/auth/auth.service";
import { Gmplane } from "../../../models/gm/gmplane";
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: "app-gntoper",
  templateUrl: "./gntoper.page.html",
  styleUrls: ["./gntoper.page.scss"]
})
export class GntoperPage implements OnInit {
  loading=false;
  user: TOAccess;
  gntoper: gntoper[];
  sede: gntoper;
  gminfar: gminfar = new gminfar();
  gm_dinfa: gmdinfa = new gmdinfa();
  plan: Gmplane;
  din_feci:Date;
  @ViewChild(AlertComponent, {'static':false}) _alertC:AlertComponent
  constructor(
    private _service: GntoperService,
    private _modal: ModalController,
    private _gminfar: GminfarService,
    private _alert: AlertService,
    private auth: AuthService,
    private _nav: NavParams
  ) {
    this.user = this.auth.loadUser();
    this.plan = this._nav.get("plan");
  }

  ngOnInit() {
    this.GetGnToper();
  }

  GetGnToper() {
    return this._service.GetGnToper().subscribe(resp => {
      this.gntoper = resp.ObjTransaction;
    });
  }


  ShowConfirm() {
    this._alert
      .showAlertConfirm(
        "¿Estás seguro de realizar esta inscripción?",
        "Confirmar inscripción"
      )
      .then((resp: boolean) => {

        if(resp){
          this.pushInscription();
        }
     
      });
  }

  dismiss(gntoper: gntoper) {
    this._modal.dismiss(gntoper);
  }


  pushInscription(){
    this.loading=true;
    this._alertC.ngOnDestroy();
    let details: gmdinfa[] = [];

    let gmdinfa: gmdinfa = {
      cli_coda: this.user.objResult.cli_coda,
      din_cant: 1,
      din_cfef: "S",
      din_feci: this.din_feci,
      din_fecf:this.din_feci,
      din_pvde: 0,
      din_tide: "P",
      din_valo: 0,
      pla_codi: this.plan.pla_codi
    };

    details.push(gmdinfa);
    this.gminfar = {
      emp_codi: 1,
      top_codi: this.sede.top_codi,
      inf_fech: new Date(),
      cli_coda: this.user.objResult.cli_coda,
      inf_nume: 0,
      arb_cods: this.sede.arb_codi,
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_envc: "N",
      inf_icrm: "N",
      inf_pcor: "N",
      inf_icde: "S",
      detalle: details
    };

    console.log('enviando inscripción');

    this._gminfar.SetGmInfar(this.gminfar,this.user).subscribe(resp=>{
      console.log(resp);
      this.loading=false;
      if(resp.Retorno==1)
      this._alertC.show(resp.TxtError,'danger');
      else
      this._alert.showAlert('Inscripción realizada!','Te has inscrito a este plan exitosamente!');
      
    })
  }
}
