import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GnconexService } from '../../../services/gn/gnconex.service';
import { gnconex } from '../../../models/gn/gnconex';


@Component({
  selector: 'app-gnconex',
  templateUrl: './gnconex.page.html',
  styleUrls: ['./gnconex.page.scss'],
})
export class GnconexPage implements OnInit {
  businessList: gnconex[]=[];
  loading=false;
  constructor(private _modal:ModalController,private _service:GnconexService) { }


  ngOnInit() {
    this.GetBusinessList();
  }

  GetBusinessList() {
    this.loading=true;
    this._service.GetGnConex().subscribe(resp => {
      console.log(resp);
      if (resp.State) {
        this.businessList = resp.ObjResult;
        this.loading=false;
      }
    });
  }

   async SetBusiness(business: gnconex) {
    await this._modal.dismiss(business);
  }
}
