import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { tuplatu } from '../../../models/te/tuplatu';

@Component({
  selector: 'app-tuplatu',
  templateUrl: './tuplatu.page.html',
  styleUrls: ['./tuplatu.page.scss'],
})
export class TuplatuPage implements OnInit {
tuplatu:tuplatu[]=[];
  constructor(private _http:HttpManagerService) { }

  ngOnInit() {
    this.GetTuPlatu();
  }

  GetTuPlatu(){
  this._http.Get('/tuplatu').subscribe(resp=>{
    this.tuplatu = resp.ObjTransaction;
  })
  }
}