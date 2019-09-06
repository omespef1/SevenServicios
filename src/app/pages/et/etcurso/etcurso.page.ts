import { Component, OnInit } from "@angular/core";
import { etcurso } from "../../../models/et/etcurso";
import { ToTransaction } from '../../../models/general/totransaction';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: "app-etcurso",
  templateUrl: "./etcurso.page.html",
  styleUrls: ["./etcurso.page.scss"]
})
export class EtcursoPage implements OnInit {
  etcurso: etcurso[] = [];
  constructor(private _http: AuthService) {

  }

  ngOnInit() {
    this.GetEtCurso();
  }

  GetEtCurso(event?:any) {
    this._http.Get<ToTransaction>("/etcurso?").subscribe(resp => {    
      this.etcurso= resp.ObjTransaction;
      if(event)event.target.complete();
    });
  }

  doRefresh($event){
this.GetEtCurso($event);
  }
}
