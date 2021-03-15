import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { EtasistService } from '../../../services/et/etasist.service';
import { EtRinho } from '../../../models/et/etasist';

@Component({
  selector: 'app-etsmenu',
  templateUrl: './etsmenu.page.html',
  styleUrls: ['./etsmenu.page.scss'],
})
export class EtsmenuPage implements OnInit {
  enableMenu = false;
  loading = false;
  smenu: mainSmenu[] = [];
  etrinho: EtRinho[];

  constructor(
    private _alert: AlertService,
    private _route: Router,
    private _service: EtasistService
  ) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Planes",
        mainPath: "et/etcurso",
        mainSrc: ""
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Asistencias",
        mainPath: "et/etasist",
        mainSrc: ""
      },
      {
        mainIcon: "cash",
        mainTitle: "Cotizaciones",
        mainPath: "et/etcotiz",
        mainSrc: ""
      }      
    ];
  }

  ngOnInit() {
    this.getAperturas();
  }

  GoPage(main: mainSmenu){
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }

  getAperturas() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getAperturas(user).subscribe((resp: ToTransaction) => {
      this.etrinho = resp.ObjTransaction;
      if (resp.Retorno == 1) {
        // this._alert.showAlert('Retono', resp.TxtError);
        this.enableMenu = false;
      }
      this.loading = false;
      console.log(resp);
      if (resp.ObjTransaction.length >> 0){
        this.enableMenu = true;
      }
    });
  }
}
