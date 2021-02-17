import { Component, OnInit, ViewChild } from "@angular/core";
import { etcurso } from "../../../models/et/etcurso";
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { EtcursoService } from 'src/app/services/et/etcurso.service';
import { gnconex } from '../../../models/gn/gnconex';
import { ConfigService } from "src/app/services/config/config.service";

@Component({
  selector: "app-etcurso",
  templateUrl: "./etcurso.page.html",
  styleUrls: ["./etcurso.page.scss"]
})
export class EtcursoPage implements OnInit {
  @ViewChild(AlertComponent, { static: false }) _alertC: AlertComponent;
  etcurso: etcurso[] = [];
  loading=false;
  logo: any = 'assets/imgs/logo.png';

  constructor(private _service:EtcursoService,
    private configService:ConfigService) {
   
  }

  ngOnInit() {
    this.GetEtCurso();
    this.GetLogo();
  }

  GetLogo(){
    this.logo =  this.configService.Get().CNX_LOGO;
  }

  GetEtCurso(event?:any) {
  this.loading=true;
    this._service.GetEtCurso().subscribe(resp => {    
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
