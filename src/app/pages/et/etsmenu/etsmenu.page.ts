import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etsmenu',
  templateUrl: './etsmenu.page.html',
  styleUrls: ['./etsmenu.page.scss'],
})
export class EtsmenuPage implements OnInit {
  enableMenu = false;
  loading = false;
  smenu: mainSmenu[] = [];

  constructor(
    private _alert: AlertService,
    private _route: Router
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
      }
    ];
  }

  ngOnInit() {
  }

  GoPage(main: mainSmenu){
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }
}
