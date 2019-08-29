import { Component, OnInit } from '@angular/core';
import { plcacul } from 'src/app/models/pl/plcacul';
import { ToTransaction } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-plcacul',
  templateUrl: './plcacul.page.html',
  styleUrls: ['./plcacul.page.scss'],
})
export class PlcaculPage implements OnInit {
plcacul:plcacul[]=[];
  constructor(private _http:AuthService) { }

  ngOnInit() {
    this.GetPlCacul();
  }

  GetPlCacul(){
  this._http.Get<ToTransaction>('/plcacul').subscribe(resp=>{
    this.plcacul =   resp.ObjTransaction;
  })
  }

}
