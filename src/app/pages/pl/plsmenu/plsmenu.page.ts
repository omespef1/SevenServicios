import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plsmenu',
  templateUrl: './plsmenu.page.html',
  styleUrls: ['./plsmenu.page.scss'],
})
export class PlsmenuPage implements OnInit {

  smenu: mainSmenu[] = [];

  constructor(
    private _route: Router
  ) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Inscripciones",
        mainPath: "pl/plcacul",
        mainSrc: ""
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Consultas de Asistencias",
        mainPath: "pl/plcasis",
        mainSrc: ""
      }
    ];
  }

  ngOnInit() {
  }

  GoPage(main: mainSmenu){
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }

}
