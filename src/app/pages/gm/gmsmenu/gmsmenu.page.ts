import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gmsmenu',
  templateUrl: './gmsmenu.page.html',
  styleUrls: ['./gmsmenu.page.scss'],
})
export class GmsmenuPage implements OnInit {
  smenu: mainSmenu[] = [];

  constructor(private _route: Router) {
    this.smenu = [{
      mainIcon: "eye",
      mainTitle: "Planes",
      mainPath: "gm/gmplane",
      mainSrc: ""
    },
    {
      mainIcon: "cash",
      mainTitle: "Cotizaciones",
      mainPath: "gm/gmcotiz",
      mainSrc: ""
    }]
  }

  ngOnInit() {
  }

  GoPage(main: mainSmenu) {
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }

}
