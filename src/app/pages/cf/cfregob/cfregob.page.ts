import { Component, OnInit, ɵConsole } from '@angular/core';
import { caregob } from 'src/app/models/cf/cfregob';
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToTransaction, TOAccess } from '../../../models/general/totransaction';
import { NavController, ModalController } from '@ionic/angular';
import { CadrecoPage } from '../cadreco/cadreco.page';


@Component({
  selector: 'app-cfregob',
  templateUrl: './cfregob.page.html',
  styleUrls: ['./cfregob.page.scss'],
})
export class CfregobPage implements OnInit {

loading=false;
  caregob:caregob[]= [];
  
  constructor(private _http:HttpManagerService,private auth:AuthService,private modalController:ModalController) { }
  user:TOAccess;
  ngOnInit() {
    this.user = this.auth.loadUser();
    this.GetCaregob();
    
  }

  GetCaregob(event?:any){
    this.loading=true;
    console.log(this.user);
     this._http.Get<ToTransaction>(`/CaRegob?cli_coda=${this.user.objResult.cli_coda}&`,this.user.strToken).subscribe(resp=>{
    this.caregob = resp.ObjTransaction;
    this.loading=false;
    if (event) event.target.complete();
  },error=>console.log(error));
  }

  doRefresh($event) {
    this.GetCaregob($event);
  }

  async presentModalDetail(caregob:caregob) {
    const modal = await this.modalController.create({
      component: CadrecoPage,
      componentProps: {
        cfregob: caregob
      }
    });
    return await modal.present();
  }
}
