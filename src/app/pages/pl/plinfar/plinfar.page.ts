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
import { TypeOperation } from '../../../models/general/type-operation.model';
import { Item } from '../../../models/general/items';
import { ModalModel } from '../../../models/general/modal.model';
import { ModalComponent } from '../../../components/modal/modal/modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-plinfar",
  templateUrl: "./plinfar.page.html",
  styleUrls: ["./plinfar.page.scss"]
})
export class PlinfarPage implements OnInit {
  plpfare: plpfare[] = [];
  user: TOAccess;
  data: plcacul;
  operations:TypeOperation[]=[];
  campus:TypeOperation;
  initDate:Date;
  loading=false;
  constructor(
    private _plPfare: PlPfareService,
    public _service: PlinfarService,
    private _auth: AuthService,
    private router: Router,
    private _alertS:AlertService,
    private _sesion:SessionsService,
    private modalController:ModalController
  ) {
    this.user = this._auth.loadUser();

    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.data);
    }
  }
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  ngOnInit() {
    this.getTypeOperations();
  }

  getTypeOperations() {
    this._plPfare.GetPlPfare(this.user.objResult.emp_codi).subscribe(resp => {
      if (resp.Retorno == 0) {
        this.operations = resp.ObjTransaction;
      }
    })
  }

  ShowConfirm() {
    this._alertS
      .showAlertConfirm(
        "¿Estás seguro de realizar esta inscripción?",
        "Confirmar inscripción"
      )
      .then((resp: boolean) => {

        if (resp) {
          this.SetPlInfar();
        }

      });
  }


  SetPlInfar() { 
    this.loading=true;
    let inscription: plinfar = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      arb_cods: "",
      cli_coda: this.user.objResult.cli_coda,
      top_codi: this.campus.TOP_CODI,
      inf_icrm: "N",
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_fech: new Date(),
      inf_icde: "S",
      inf_envc: "S",
      inf_nume: 0,
      inf_pcor: "S",
    
      detalle: [
        {
          apc_cont: this.data.cac_cont,
          cli_coda: this.user.objResult.cli_coda,
          din_cant: 1,
          din_valo: 0,
          din_taes: "N",
          din_tide: "P",
          din_pvde: 0,
          emp_codi:this._sesion.GetGnEmpre().emp_codi,
          inf_cont:0
        }
      ]
    };
    this._service.SetPlInfar(inscription, this.user).subscribe(resp => {     
      this.loading=false;
      if (resp.Retorno == 1) {
        this._alertS.error(resp.TxtError);
      } else{
        this._alertS.success('La inscripción ha sido realizada!');
        this.router.navigateByUrl('tabs/pl/plcacul')
      } 
    });
  }


  
  async openModal() {
    let items: Item[] = [];
    this.operations.forEach(item => {
      items.push({ id: item.TOP_CODI, name: item.TOP_NOMB })
    })

    const modalParam: ModalModel = {

      icon: 'add-circle-outline',
      source: items
    }
    console.log(this.operations);
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { 'source': modalParam }
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data) {       
        this.campus = { TOP_CODI: data.data.id, TOP_NOMB: data.data.name }
      }
    })

  }
}
