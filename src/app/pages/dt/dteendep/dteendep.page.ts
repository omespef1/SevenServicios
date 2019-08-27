import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { dtendep } from '../../../models/dt/dtendep';

@Component({
  selector: 'app-dteendep',
  templateUrl: './dteendep.page.html',
  styleUrls: ['./dteendep.page.scss'],
})


export class DteendepPage implements OnInit {
 


  dtendep:dtendep[]=[];
  constructor(private _http:HttpManagerService) { }

  ngOnInit() {
    this.GetDtEndep();
  }


  GetDtEndep() {
    this._http.Get("/dtendep").subscribe((resp)=>{
       this.dtendep = resp.ObjTransaction;
   });
   }
}
