import { Component } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';
import { TabsService } from '../services/tabs/tabs.service';
import { mainMenu } from '../models/general/menu';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    
  tabs:mainMenu[];
  constructor(private _tabs:TabsService) {

    this.tabs = _tabs.tabs;
  }

}
