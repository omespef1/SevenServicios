import { ModalComponent } from './../../../components/modal/modal/modal.component';
import { ModalModel } from './../../../models/general/modal.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GminfarService } from '../../../services/gm/gminfar.service';
import { gminfar, gmdinfa } from '../../../models/gm/gminfar';
import { TOAccess } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Gmplane } from 'src/app/models/gm/gmplane';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Item } from '../../../models/general/items';
import { GmpfareService } from '../../../services/gm/gmpfare.service';
import { TypeOperation } from '../../../models/general/type-operation.model';
import { Inscription, DetailInscription } from '../../../models/general/inscription.model';

@Component({
  selector: 'app-gminfar',
  templateUrl: './gminfar.page.html',
  styleUrls: ['./gminfar.page.scss'],
})
export class GminfarPage implements OnInit {
  loading=false;
  user: TOAccess;
  gminfar: Inscription = new Inscription();
  gm_dinfa: DetailInscription = new DetailInscription();
  plan: Gmplane;
  din_feci:Date;
  operations:TypeOperation[]=[];
  campus:TypeOperation;
  @ViewChild(AlertComponent, {'static':false}) _alertC:AlertComponent
  constructor(
    private _modal: ModalController,
    public gminfarService: GminfarService,
    private _alert: AlertService,
    private auth: AuthService,
    private router:Router,
    private gmpfareService:GmpfareService,
    private modalController:ModalController
  ) {
    this.user = this.auth.loadUser();
    this.plan = this.router.getCurrentNavigation().extras.state.gmplane;
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
    this._modal.dismiss();
  }


  getTypeOperations(){
    this.gmpfareService.getGmPfare(this.user.objResult.emp_codi).subscribe(resp=>{
      if(resp.Retorno==0){
      this.operations=resp.ObjTransaction;
      }
    })
  }

  pushInscription(){
    this.loading=true;
    this._alertC.ngOnDestroy();
    let details: DetailInscription[] = [];

    let gmdinfa: DetailInscription = {
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
      emp_codi: this.user.objResult.emp_codi,
      top_codi: this.campus.TOP_CODI,
      inf_fech: new Date(),
      cli_coda: this.user.objResult.cli_coda,
      inf_nume: 0,
      arb_cods: "",
      inf_desc: `Inscripción ${this.user.objResult.cli_noco}`,
      inf_envc: "N",
      inf_icrm: "N",
      inf_pcor: "N",
      inf_icde: "S",
      detalle: details
    };

    console.log('enviando inscripción');

    this.gminfarService.SetGmInfar(this.gminfar,this.user).subscribe(resp=>{
      console.log(resp);
      this.loading=false;
      if(resp.Retorno==1)
     {
      Swal.fire({
        title: 'Error!',
        text: resp.TxtError,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
     }
      else{
        Swal.fire({
          title: 'Genial!',
          text: 'Inscripción realizada!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigateByUrl('tabs/gm/gmplane')
      }
     
      
    },err=>{
      this.gminfarService.loading.next(false);
    })
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
        this.campus = data.data;
        this.gminfar.top_codi = data.data.id;
        this.campus = { TOP_CODI:data.data.id,TOP_NOMB:data.data.name}
      }
     })
 
  }

}
