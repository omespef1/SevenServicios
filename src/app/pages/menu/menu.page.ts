import { Component, OnInit } from "@angular/core";
import { mainMenu } from "src/app/models/general/menu";
import { Router } from "@angular/router";
import { TabsService } from "../../services/tabs/tabs.service";
import { SessionsService } from "src/app/services/sessions/sessions.service";
import { ModalController } from "@ionic/angular";
import { GnconexPage } from "../gn/gnconex/gnconex.page";
import { GnemprePage } from "../gn/gnempre/gnempre.page";
import { gnconex } from '../../models/gn/gnconex';
import { ConfigService } from "src/app/services/config/config.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  CNX_NOMB: String = "Digital Ware";
  logo: any = 'assets/imgs/logo.png';
  pagesMenu: mainMenu[] = [];

  constructor(
    private _route: Router,
    private _tabs: TabsService,
    private configService: ConfigService,
    private _sesion: SessionsService,
    private _modal: ModalController
  ) {
    this.pagesMenu = _tabs.tabs;
  }

  async ngOnInit() {
    await this.GetGnConex();
  }

  GoMenu(main: mainMenu) {
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }

  async GetGnConex() {
    if (this._sesion.GetGnConex() == null) {
      const modal = await this._modal.create({
        component: GnconexPage
      });
      modal.onDidDismiss().then(resp => {
        console.log(resp.data);
        this._sesion.SetGnConex(resp.data);
        this.GetGnEmpre();
        this.GetDataConex();
      });
      return await modal.present();
    } else {
      this.GetDataConex();
    }
  }

  GetDataConex() {
    let gnconex: gnconex = this.configService.Get();
    this.CNX_NOMB = gnconex.CNX_NOMB;
    this.logo = gnconex.CNX_LOGO;
  }

  async GetGnEmpre() {
    if (this._sesion.GetGnEmpre() == null) {
      const modal = await this._modal.create({
        component: GnemprePage
      });
      modal.onDidDismiss().then(resp => {
        console.log(resp);
        this._sesion.SetGnEmpre(resp.data);
      });
      return await modal.present();
    }
  }
}
