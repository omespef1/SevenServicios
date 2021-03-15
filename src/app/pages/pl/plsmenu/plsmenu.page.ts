import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from '@angular/router';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { PlasistService } from '../../../services/pl/plasist.service';
import { plapert } from "src/app/models/pl/plasist";
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-plsmenu',
  templateUrl: './plsmenu.page.html',
  styleUrls: ['./plsmenu.page.scss'],
})
export class PlsmenuPage implements OnInit {
  enableMenu = false;
  loading = false;
  PlApert: plapert[];
  smenu: mainSmenu[] = [];

  constructor(
    private _service: PlasistService,
    private _alert: AlertService,
    private _route: Router
  ) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Planes",
        mainPath: "pl/plcacul",
        mainSrc: ""
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Asistencias",
        mainPath: "pl/plasist",
        mainSrc: ""
      },
      {
        mainIcon: "calendar",
        mainTitle: "Consultas de Asistencias",
        mainPath: "pl/plcasis",
        mainSrc: ""
      },
      {
        mainIcon: "cash",
        mainTitle: "Cotizaciones",
        mainPath: "pl/plcotiz",
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
      this.PlApert = resp.ObjTransaction;
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
