import { AlertService } from './../../../services/alert/alert.service';
import { TeInfarService } from './../../../services/te/teinfar.service';
import { ModalModel } from './../../../models/general/modal.model';
import { Item } from './../../../models/general/items';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertComponent } from "src/app/components/alert/alert.component";
import { TePfareService } from "../../../services/te/tepfare.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { tepfare } from "src/app/models/te/tepfare";
import { TOAccess } from "src/app/models/general/totransaction";
import { tecuter } from "src/app/models/te/tecuter";
import { teinfar } from "src/app/models/te/teinfar";
import { SessionsService } from '../../../services/sessions/sessions.service';
import { TypeOperation } from '../../../models/general/type-operation.model';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../../components/modal/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: "app-teinfar",
  templateUrl: "./teinfar.page.html",
  styleUrls: ["./teinfar.page.scss"]
})
export class TeinfarPage implements OnInit {
  tepfare: tepfare[] = [];
  sede: tepfare;
  user: TOAccess;
  din_feci:Date= new Date()
  option: tecuter;
  campus : TypeOperation;
  operations:TypeOperation[]=[];
  loading = false;
  constructor(
    private _TePfare: TePfareService,
    private _service: TeInfarService,
    private _auth: AuthService,
    private router: Router,
    private _alertS:AlertService,
    private modalController:ModalController,
    private teInfarService:TeInfarService
  ) {
    this.user = this._auth.loadUser();

    if (this.router.getCurrentNavigation().extras.state) {
      this.option = this.router.getCurrentNavigation().extras.state.option;
    }
  }

  ngOnInit() {
    
    this.getTypeOperations();
  }

  ShowConfirm() {
    this._alertS.showAlertConfirm(
        "¿Estás seguro de realizar esta inscripción?",
        "Confirmar inscripción"
      )
      .then((resp: boolean) => {

        if(resp){
          this.SetTeInfar();
        }
     
      });
  }


  SetTeInfar() {
    this.loading = true;
    let inscription: teinfar = {
      emp_codi: this.user.objResult.emp_codi,
      arb_cods: "",
      cli_coda: this.user.objResult.cli_coda,
      top_codi: this.campus.TOP_CODI,
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
        Swal.fire({
          title: 'Error!',
          text: resp.TxtError,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      } else{
        Swal.fire({
          title: 'Genial!',
          text: 'Inscripción realizada!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      this._alertS.showAlert('Perfecto!','La inscripción ha sido realizada!');
      this.router.navigateByUrl('tabs/te/tecuter');
   
       }

    });
  }


  getTypeOperations(){
    this.teInfarService.getTePfare(this.user.objResult.emp_codi).subscribe(resp=>{
      if(resp.Retorno==0){
      this.operations=resp.ObjTransaction;
      }
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
        this.campus = { TOP_CODI:data.data.id,TOP_NOMB:data.data.name}
      }
     })
 
  }
}
