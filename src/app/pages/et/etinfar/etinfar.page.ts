import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { etcurso } from 'src/app/models/et/etcurso';
import { EtInfar } from 'src/app/models/et/etinfar';
import { TOAccess } from '../../../models/general/totransaction';
import { TypeOperation } from '../../../models/general/type-operation.model';
import { AlertService } from '../../../services/alert/alert.service';
import { EtInfarService } from '../../../services/et/etinfar.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { EtpfareService } from '../../../services/et/etpfare.service';
import { EtDinfa } from '../../../models/et/etdinfa';
import Swal from 'sweetalert2';
import { ModalModel } from '../../../models/general/modal.model';
import { ModalComponent } from '../../../components/modal/modal/modal.component';
import { Item } from '../../../models/general/items';
import { etdcurs } from '../../../models/et/etcurso';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-etinfar',
  templateUrl: './etinfar.page.html',
  styleUrls: ['./etinfar.page.scss'],
})
export class EtinfarPage implements OnInit {

  loading = false;
  user: TOAccess;
  header: EtInfar = new EtInfar();
  data: etcurso;
  initDate: Date;
  operations: TypeOperation[] = [];
  campus: TypeOperation;
  constructor(
    private modalController: ModalController,
    private _alert: AlertService,
    public etInfarService: EtInfarService,
    private auth: AuthService,
    private router: Router,
    private etPfareService: EtpfareService,
  ) {
    this.user = this.auth.loadUser();
    this.data = this.router.getCurrentNavigation().extras.state.data;
    console.log(this.data);
  }

  ngOnInit() {

    this.getTypeOperations();

  }



  ShowConfirm() {
    this._alert
      .showAlertConfirm(
        "¿Estás seguro de realizar esta inscripción?",
        "Confirmar inscripción"
      )
      .then((resp: boolean) => {

        if (resp) {
          this.pushInscription();
        }

      });
  }

  dismiss() {
    this.modalController.dismiss();
  }


  getTypeOperations() {
    this.etPfareService.getEtPfare(this.user.objResult.emp_codi).subscribe(resp => {
      if (resp.Retorno == 0) {
        this.operations = resp.ObjTransaction;
      }
    })
  }

  pushInscription() {
    this.loading = true;

    let course = this.data.detail.filter(v=>v.checked)[0];
    this.header = {
      emp_codi: this.user.objResult.emp_codi,
      top_codi: 0,
      inf_fech: new Date(),
      cli_coda: this.user.objResult.cli_coda,
      inf_nume: 0,
      arb_cods: "",
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_envc: "N",
      inf_icrm: "N",
      inf_pcor: "N",
      inf_icde: "S",
      detalle: [{
        cli_coda: this.user.objResult.cli_coda,
        din_cant: 1,
        din_feci: course.dcu_hori,
        din_fecf: course.dcu_horf,
        din_pvde: 0,
        din_tide: "P",
        din_valo: 0,
        cur_cont: this.data.cur_cont,
        din_taes:'',
        emp_codi:this.header.emp_codi,
        dcu_cont:course.dcu_cont,
        inf_cont:0
      }]
    };

    console.log('enviando inscripción');

    this.etInfarService.SetEtInfar(this.header, this.user).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      if (resp.Retorno == 1) {
        Swal.fire({
          title: 'Error!',
          text: resp.TxtError,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
      else {
        Swal.fire({
          title: 'Genial!',
          text: 'Inscripción realizada!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigateByUrl('dt/dtsmenu')
      }


    }, err => {
      this.etInfarService.loading.next(false);
    })
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

  setHour(element,data:etdcurs){

   
    for(let item of this.data.detail){    
        
      if(item.checked && item.dcu_cont != data.dcu_cont)
          item.checked =  false;
     
    }

  }

  selectedTime(){
    return this.data.detail.filter(v=>v.checked).length>0;
  }
}