import { Component, OnInit } from '@angular/core';
import { mainMenu } from 'src/app/models/general/menu';
import { Router } from '@angular/router';
import { TabsService } from '../../services/tabs/tabs.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {

  pagesMenu : mainMenu[] =[]
  constructor(private _route:Router,private _tabs:TabsService) {

    this.pagesMenu = _tabs.tabs;

   }

  ngOnInit() {
  }

  GoMenu(main:mainMenu){
    this._route.navigateByUrl(`tabs/${main.mainPath}`,);
  }

}
