import { Component, OnInit, ɵConsole } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from "@angular/router";
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { TeasistService } from '../../../services/te/teasist.service';
import { AlertService } from '../../../services/alert/alert.service';
import { teapert } from '../../../models/te/teasist';

@Component({
  selector: 'app-tesmenu',
  templateUrl: './tesmenu.page.html',
  styleUrls: ['./tesmenu.page.scss'],
})
export class TesmenuPage implements OnInit {
  enableMenu = false;
  loading = false;
  TeApert: teapert[];
  smenu: mainSmenu[] = [];

  constructor(
    private _service: TeasistService,
    private _alert: AlertService,
    private _route: Router
  ) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Planes",
        mainPath: "te/tecuter",
        mainSrc: ""
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Asistencias",
        mainPath: "te/teasist",
        mainSrc: ""
      },
      {
        mainIcon: "calendar",
        mainTitle: "Consultas de Asistencias",
        mainPath: "te/tecasis",
        mainSrc: ""
      },
      {
        mainIcon: "cash",
        mainTitle: "Cotizaciones",
        mainPath: "te/tecotiz",
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
      this.TeApert = resp.ObjTransaction;
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
