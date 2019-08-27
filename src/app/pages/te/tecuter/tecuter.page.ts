import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { tecuter } from '../../../models/te/tecuter';

@Component({
  selector: 'app-tecuter',
  templateUrl: './tecuter.page.html',
  styleUrls: ['./tecuter.page.scss'],
})
export class TecuterPage implements OnInit {
tecuter:tecuter[]=[];
  constructor(private _http:HttpManagerService) { }

  ngOnInit() {
    this.GetTeCuter();
  }

  GetTeCuter() {
   this._http.Get("/tecuter").subscribe((resp)=>{
      this.tecuter = resp.ObjTransaction;
  });
  }
}
