import { Component, OnInit } from '@angular/core';
import { tecuter } from '../../../models/te/tecuter';
import { ToTransaction } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-tecuter',
  templateUrl: './tecuter.page.html',
  styleUrls: ['./tecuter.page.scss'],
})
export class TecuterPage implements OnInit {
tecuter:tecuter[]=[];
  constructor(private _http:AuthService) { }

  ngOnInit() {
    this.GetTeCuter();
  }

  GetTeCuter() {
   this._http.Get<ToTransaction>("/tecuter").subscribe((resp)=>{
      this.tecuter = resp.ObjTransaction;
  });
  }
}
