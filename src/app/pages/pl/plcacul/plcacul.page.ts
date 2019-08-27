import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { plcacul } from 'src/app/models/pl/plcacul';

@Component({
  selector: 'app-plcacul',
  templateUrl: './plcacul.page.html',
  styleUrls: ['./plcacul.page.scss'],
})
export class PlcaculPage implements OnInit {
plcacul:plcacul[]=[];
  constructor(private _http:HttpManagerService) { }

  ngOnInit() {
    this.GetPlCacul();
  }

  GetPlCacul(){
  this._http.Get('/plcacul').subscribe(resp=>{
    this.plcacul = resp.ObjTransaction;
  })
  }

}
