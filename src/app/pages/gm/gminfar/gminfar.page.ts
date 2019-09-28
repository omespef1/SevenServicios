import { Component, OnInit, ViewChild } from '@angular/core';
import { GminfarService } from '../../../services/gm/gminfar.service';
import { gminfar, gmdinfa } from '../../../models/gm/gminfar';
import { TOAccess } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';
import { gntoper } from 'src/app/models/gn/gntoper';
import { GntoperService } from 'src/app/services/gn/gntoper.service';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Gmplane } from 'src/app/models/gm/gmplane';
import { Router } from '@angular/router';
import { SessionsService } from '../../../services/sessions/sessions.service';

@Component({
  selector: 'app-gminfar',
  templateUrl: './gminfar.page.html',
  styleUrls: ['./gminfar.page.scss'],
})
export class GminfarPage implements OnInit {
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
    private router:Router,
    private _sesion:SessionsService
  ) {
    this.user = this.auth.loadUser();
    this.plan = this.router.getCurrentNavigation().extras.state.gmplane;
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

  dismiss() {
    this._modal.dismiss();
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
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
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
      else{
        this._alert.showAlert('Inscripción realizada!','Te has inscrito a este plan exitosamente!');
        this.router.navigateByUrl('tabs/gm/gmplane')
      }
     
      
    })
  }
}
