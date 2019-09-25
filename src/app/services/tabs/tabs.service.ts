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
        mainPath: "dtendep",
        mainSrc: ""
      },
      {
        mainIcon: "contact",
        mainTitle: "Tercera edad",
        mainPath: "tecuter",
        mainSrc: ""
      },
      {
        mainIcon: "",
        mainTitle: "Turismo",
        mainPath: "tuplatu",
        mainSrc: "assets/icon/globe-africa-solid.svg"
      },
      {
        mainIcon: "school",
        mainTitle: "Escuelas",
        mainPath: "etcurso",
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
        mainTitle: "Obligaciones",
        mainPath: "caregob",
        mainSrc: "assets/icon/coins-solid.svg"

      },
      {
        mainIcon:"",
        mainTitle: "Créditos",
        mainPath: "cascrev",
        mainSrc: "assets/icon/business-time-solid.svg"

      }
      
    ];
  }

 private  GetTabs(): mainMenu[] {
    return this.tabs;
  }
}
