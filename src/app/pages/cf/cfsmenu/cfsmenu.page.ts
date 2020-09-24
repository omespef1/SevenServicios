import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from '@angular/router';
import { TOAccess } from '../../../models/general/totransaction';
import { user } from '../../ae/aereser/models/models';

@Component({
  selector: 'app-cfsmenu',
  templateUrl: './cfsmenu.page.html',
  styleUrls: ['./cfsmenu.page.scss'],
})
export class CfsmenuPage implements OnInit {

  user: TOAccess;
  smenu: mainSmenu[] = [];

  constructor(private _route: Router
  ) {
    this.smenu = [
      {
        mainIcon: "",
        mainTitle: "Solicitud de Creditos",
        mainPath: "cf/cascrev",
        mainSrc: "assets/icon/business-time-solid.svg"
      },
      {
        mainIcon: "assets/icon/coins-solid.svg",
        mainTitle: "Cuotas Crédito",
        mainPath: "cf/caregob",
        mainSrc: "assets/icon/coins-solid.svg"
      }
    ];
  }

  ngOnInit() {
  }

  GoPage(main: mainSmenu) {
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }

}
