import { Injectable } from "@angular/core";
import { mainMenu } from "../../models/general/menu";
import { TouchSequence } from "selenium-webdriver";

@Injectable({
  providedIn: "root"
})
export class TabsService {
  tabs: mainMenu[] = [];
  constructor() {
    this.tabs = [
      {
        mainIcon: "",
        mainTitle: "Gimnasios",
        mainPath: "gm",
        mainSrc: "assets/icon/dumbbell-solid.svg"
      },
      {
        mainIcon: "bicycle",
        mainTitle: "Deportes",
        mainPath: "dt",
        mainSrc: ""
      },
      {
        mainIcon: "contact",
        mainTitle: "Tercera edad",
        mainPath: "te",
        mainSrc: ""
      },
      {
        mainIcon: "",
        mainTitle: "Turismo",
        mainPath: "tu",
        mainSrc: "assets/icon/globe-americas-solid.svg"
      },
      {
        mainIcon: "football",
        mainTitle: "Escuelas y Club",
        mainPath: "et",
        mainSrc: ""
      },
      {
        mainIcon: "",
        mainTitle: "Capacitaciones",
        mainPath: "pl",
        mainSrc: "assets/icon/chalkboard-teacher-solid.svg"
      },
      {
        mainIcon:"",
        mainTitle: "Créditos",
        mainPath: "cf",
        mainSrc: "assets/icon/business-time-solid.svg"

      }
      // {
      //   mainIcon:"",
      //   mainTitle: "Obligaciones",
      //   mainPath: "caregob",
      //   mainSrc: "assets/icon/coins-solid.svg"

      // },
      // {
      //   mainIcon:"",
      //   mainTitle: "Créditos",
      //   mainPath: "cascrev",
      //   mainSrc: "assets/icon/business-time-solid.svg"
      // }
    ];
  }

 private  GetTabs(): mainMenu[] {
    return this.tabs;
  }
}
