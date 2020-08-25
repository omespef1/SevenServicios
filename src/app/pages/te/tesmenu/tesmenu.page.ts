import { Component, OnInit, ɵConsole } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tesmenu',
  templateUrl: './tesmenu.page.html',
  styleUrls: ['./tesmenu.page.scss'],
})
export class TesmenuPage implements OnInit {

  smenu: mainSmenu[] = [];

  constructor(
    private _route: Router
  ) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Inscripciones",
        mainPath: "te/tecuter",
        mainSrc: ""
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Consultas de Asistencias",
        mainPath: "te/tecasis",
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
