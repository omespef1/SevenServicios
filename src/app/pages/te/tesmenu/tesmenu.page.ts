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
        mainTitle: "Planes",
        mainPath: "te/tecuter",
        mainSrc: "",
        mainDisable: false
      },
      {
        mainIcon: "clipboard",
        mainTitle: "Consultas de Asistencias",
        mainPath: "te/tecasis",
        mainSrc: "",
        mainDisable: false
      }
    ];
   }

  ngOnInit() {
  }

  GoPage(main: mainSmenu){
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }
}
