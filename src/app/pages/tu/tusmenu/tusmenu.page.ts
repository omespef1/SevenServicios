import { Component, OnInit } from '@angular/core';
import { mainSmenu } from '../../../models/general/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tusmenu',
  templateUrl: './tusmenu.page.html',
  styleUrls: ['./tusmenu.page.scss'],
})
export class TusmenuPage implements OnInit {
  smenu: mainSmenu[] = [];

  constructor(private _route: Router) {
    this.smenu = [
      {
        mainIcon: "eye",
        mainTitle: "Planes",
        mainPath: "tu/tuplatu",
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
