import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { dtapert } from '../../../models/dt/dtasist';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { DtasistService } from '../../../services/dt/dtasist.service';

@Component({
  selector: 'app-dtsmenu',
  templateUrl: './dtsmenu.page.html',
  styleUrls: ['./dtsmenu.page.scss'],
})
export class DtsmenuPage implements OnInit {
  enableMenu = false;
  loading = false;
  DtApert: dtapert[];
  smenu: mainSmenu[] = [];

  constructor(
    private _service: DtasistService,
    private _alert: AlertService,
    private _route: Router
  ) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Planes",
        mainPath: "dt/dteendep",
        mainSrc: ""
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Asistencias",
        mainPath: "dt/dtasist",
        mainSrc: ""
      },
      {
        mainIcon: "cash",
        mainTitle: "Cotizaciones",
        mainPath: "dt/dtcotiz",
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
      this.DtApert = resp.ObjTransaction;
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
