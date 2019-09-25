import { Component, OnInit, ViewChild } from "@angular/core";
import { etcurso } from "../../../models/et/etcurso";
import { ToTransaction } from '../../../models/general/totransaction';
import { HttpManagerService } from '../../../services/httpManager/http-manager.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: "app-etcurso",
  templateUrl: "./etcurso.page.html",
  styleUrls: ["./etcurso.page.scss"]
})
export class EtcursoPage implements OnInit {
  @ViewChild(AlertComponent, { static: false }) _alertC: AlertComponent;
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
      if(resp.Retorno==1)
      this._alertC.show(resp.TxtError,'danger');
    });
  }

  doRefresh($event){
this.GetEtCurso($event);
  }
}
