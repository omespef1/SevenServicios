import { DtpfareService } from './../../../services/dt/dtpfare.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Gmplane } from './../../../models/gm/gmplane';
import { ModalModel } from './../../../models/general/modal.model';
import { ModalComponent } from './../../../components/modal/modal/modal.component';
import { Item } from './../../../models/general/items';
import { TypeOperation } from './../../../models/general/type-operation.model';
import { DetailInscription, Inscription } from './../../../models/general/inscription.model';
import { TOAccess } from './../../../models/general/totransaction';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DtinfarService } from '../../../services/dt/dtinfar.service';
import { AlertService } from '../../../services/alert/alert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EtInfar } from 'src/app/models/et/etinfar';
import { etcurso } from 'src/app/models/et/etcurso';
import { DtInfar } from '../../../models/dt/dtinfar.model';


@Component({
  selector: 'app-dtinfar',
  templateUrl: './dtinfar.page.html',
  styleUrls: ['./dtinfar.page.scss'],
})
export class DtinfarPage implements OnInit {
  loading=false;
  user: TOAccess;
  header: EtInfar = new EtInfar();
  data: DtInfar;
  initDate:Date;
  endDate:Date;
  operations:TypeOperation[]=[];
  campus:TypeOperation;
  constructor(
    private modalController: ModalController,
    private _alert:AlertService,
    public dtInfarService: DtinfarService,
    private auth: AuthService,
    private router:Router,
    private dtpfareService:DtpfareService,
  ) {
    this.user = this.auth.loadUser();
    this.data = this.router.getCurrentNavigation().extras.state.dtendep;
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

        if(resp){
          this.pushInscription();
        }
     
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }


  getTypeOperations(){
    this.dtpfareService.getDtPfare(this.user.objResult.emp_codi).subscribe(resp=>{
      if(resp.Retorno==0){
      this.operations=resp.ObjTransaction;
      }
    })
  }

  pushInscription(){
    // this.loading=true;
    // let details: DetailInscription[] = [];

    // let gmdinfa: DetailInscription = {
    //   cli_coda: this.user.objResult.cli_coda,
    //   din_cant: 1,
    //   din_cfef: "S",
    //   din_feci: this.din_feci,
    //   din_fecf:this.din_feci,
    //   din_pvde: 0,
    //   din_tide: "P",
    //   din_valo: 0,
    //   pla_codi: this.plan.pla_codi
    // };

    // details.push(gmdinfa);
    // this.gminfar = {
    //   emp_codi: this.user.objResult.emp_codi,
    //   top_codi: this.campus.TOP_CODI,
    //   inf_fech: new Date(),
    //   cli_coda: this.user.objResult.cli_coda,
    //   inf_nume: 0,
    //   arb_cods: "",
    //   inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
    //   inf_envc: "N",
    //   inf_icrm: "N",
    //   inf_pcor: "N",
    //   inf_icde: "S",
    //   detalle: details
    // };

    // console.log('enviando inscripción');

    // this.dtInfarService.SetDtInfar(this.gminfar,this.user).subscribe(resp=>{
    //   console.log(resp);
    //   this.loading=false;
    //   if(resp.Retorno==1)
    //  {
    //   Swal.fire({
    //     title: 'Error!',
    //     text: resp.TxtError,
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar'
    //   })
    //  }
    //   else{
    //     Swal.fire({
    //       title: 'Genial!',
    //       text: 'Inscripción realizada!',
    //       icon: 'success',
    //       confirmButtonText: 'Aceptar'
    //     })
    //     this.router.navigateByUrl('tabs/dtendep')
    //   }
     
      
    // },err=>{
    //   this.dtInfarService.loading.next(false);
    // })
  }

  async openModal() {
    let items: Item[]=[];
    this.operations.forEach(item=>{
      items.push({id:item.TOP_CODI,name:item.TOP_NOMB})
    })

    const modalParam :ModalModel = {

      icon:'add-circle-outline',
      source:items
    }
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {  'source': modalParam} 
    });
   
    await modal.present();

     modal.onDidDismiss().then((data)=>{
       console.log(data);
      if(data){     
        this.campus = { TOP_CODI:data.data.id,TOP_NOMB:data.data.name}
      }
     })
 
  }
}
