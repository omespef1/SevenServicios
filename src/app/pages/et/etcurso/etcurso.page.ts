import { Component, OnInit } from "@angular/core";
import { etcurso } from "../../../models/et/etcurso";
import { ToTransaction } from '../../../models/general/totransaction';
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';

@Component({
  selector: "app-etcurso",
  templateUrl: "./etcurso.page.html",
  styleUrls: ["./etcurso.page.scss"]
})
export class EtcursoPage implements OnInit {
  etcurso: etcurso[] = [];
  loading=false;
  constructor(private _http: HttpManagerService) {
   
  }

  ngOnInit() {
    this.GetEtCurso();
  }

  GetEtCurso(event?:any) {
  this.loading=true;
    this._http.Get<ToTransaction>("/etcurso?").subscribe(resp => {    
      this.etcurso= resp.ObjTransaction;
      if(event)event.target.complete();
      this.loading=false;
    });
  }

  doRefresh($event){
this.GetEtCurso($event);
  }
}
