import { DtpfareService } from './../../../services/dt/dtpfare.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Gmplane } from './../../../models/gm/gmplane';
import { ModalModel } from './../../../models/general/modal.model';
import { ModalComponent } from './../../../components/modal/modal/modal.component';
import { Item } from './../../../models/general/items';
import { TypeOperation } from './../../../models/general/type-operation.model';
import { DetailInscription, Inscription } from './../../../models/general/inscription.model';
import { TOAccess } from './../../../models/general/totransaction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DtinfarService } from '../../../services/dt/dtinfar.service';
import { AlertService } from '../../../services/alert/alert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EtInfar } from 'src/app/models/et/etinfar';
import { etcurso } from 'src/app/models/et/etcurso';
import { DtInfar } from '../../../models/dt/dtinfar.model';
import { SessionsService } from '../../../services/sessions/sessions.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { dtendep } from 'src/app/models/dt/dtendep';


@Component({
  selector: 'app-dtinfar',
  templateUrl: './dtinfar.page.html',
  styleUrls: ['./dtinfar.page.scss'],
})
export class DtinfarPage implements OnInit {

  user: TOAccess;
  data: dtendep;
  operations:TypeOperation[]=[];
  campus:TypeOperation;
  initDate:Date;
  loading=false;
  constructor(
    public dtInfarService: DtinfarService,
    public dtPfareService: DtpfareService,
    private _auth: AuthService,
    private router: Router,
    private _alertS:AlertService,
    private _sesion:SessionsService,
    private modalController:ModalController
  ) {
    this.user = this._auth.loadUser();

  
      this.data = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.data);
 
  }
  @ViewChild(AlertComponent, { static: false }) _alert: AlertComponent;
  ngOnInit() {
    this.getTypeOperations();
  }

  getTypeOperations() {
    this.dtPfareService.getDtPfare(this.user.objResult.emp_codi).subscribe(resp => {
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
          this.setDtInfar();
        }

      });
  }


  setDtInfar() { 
    this.loading=true;
    let inscription: DtInfar = {
      emp_codi: this._sesion.GetGnEmpre().emp_codi,
      arb_cods: "",
      cli_coda: this.user.objResult.cli_coda,
      top_codi: 0,
      inf_icrm: "N",
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_fech: new Date(),
      inf_icde: "N",
      inf_envc: "S",
      inf_nume: 0,
      inf_pcor: "S",
    
      detalle: [
        {
          apc_cont: this.data.end_cont,
          cli_coda: this.user.objResult.cli_coda,
          din_cant: 1,
          din_valo: 0,       
          din_tide: "P",
          din_pvde: 0,
          emp_codi:this._sesion.GetGnEmpre().emp_codi,
          inf_cont:0
        }
      ]
    };
    this.dtInfarService.SetDtInfar(inscription, this.user).subscribe(resp => {     
      this.loading=false;
      if (resp.Retorno == 1) {
        this._alertS.error(resp.TxtError);
      } else{
        this._alertS.success('La inscripción ha sido realizada!');
        this.router.navigateByUrl('tabs/dt/dtendeep')
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
