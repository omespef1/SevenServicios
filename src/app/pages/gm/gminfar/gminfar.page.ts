import { Component, OnInit } from '@angular/core';
import { GminfarService } from '../../../services/gm/gminfar.service';
import { gminfar } from '../../../models/gm/gminfar';
import { TOAccess } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';
import { gntoper } from 'src/app/models/gn/gntoper';

@Component({
  selector: 'app-gminfar',
  templateUrl: './gminfar.page.html',
  styleUrls: ['./gminfar.page.scss'],
})
export class GminfarPage implements OnInit {
  gminfar:gminfar= new gminfar();
  user:TOAccess;
  gntoper:gntoper[];
  
  constructor(private _service:GminfarService,private _auth:AuthService) {
    this.user = this._auth.loadUser();
   }

  ngOnInit() {
  }


  SetNewGmInfar(){
   
  
    
    this._service.SetGmInfar(null);
  }

  GetGmInfar(){
    this._service.GetGmInfar(this.user).subscribe(resp=>{
      this.gminfar = resp.ObjTransaction;
    })
  }

  LoadGnToper(){
    
  }
}
