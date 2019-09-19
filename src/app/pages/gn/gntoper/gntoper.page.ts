import { Component, OnInit } from '@angular/core';
import { GntoperService } from '../../../services/gn/gntoper.service';
import { gntoper } from '../../../models/gn/gntoper';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gntoper',
  templateUrl: './gntoper.page.html',
  styleUrls: ['./gntoper.page.scss'],
})
export class GntoperPage implements OnInit {
  gntoper:gntoper[];
  constructor(private _service:GntoperService,private _modal:ModalController) { }

  ngOnInit() {
    this.GetGnToper();
  }

  GetGnToper(){
   return this._service.GetGnToper().subscribe(resp=>{
     this.gntoper = resp.ObjTransaction;
    

   })
  }

  dismiss(gntoper:gntoper){
      this._modal.dismiss(gntoper);
  }
  

}
