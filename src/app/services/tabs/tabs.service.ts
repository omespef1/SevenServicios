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
        mainTitle: "Gimnasio",
        mainPath: "gmplane",
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
        mainIcon: "school",
        mainTitle: "Cursos",
        mainPath: "plcacul",
        mainSrc: ""
      },
      {
        mainIcon: "",
        mainTitle: "Capacitaciones",
        mainPath: "plcacul",
        mainSrc: "assets/icon/money-check-alt-solid.svg"
      },
      // {
      //   mainIcon: "",
      //   mainTitle: "Servicios",
      //   mainPath: "aereser",
      //   mainSrc: "assets/icon/spa-solid.svg"
      // },
      // {
      //   mainIcon: "bed",
      //   mainTitle: "Alojamiento",
      //   mainPath: "aereser",
      //   mainSrc: ""
      // },
      // {
      //   mainIcon: "",
      //   mainTitle: "Eventos",
      //   mainPath: "aereser",
      //   mainSrc: "assets/icon/calendar-alt-solid.svg"
      // },
      {
        mainIcon:"",
        mainTitle: "Obligaciones",
        mainPath: "caregob",
        mainSrc: "assets/icon/money-check-alt-solid.svg"

      },
      {
        mainIcon:"",
        mainTitle: "Solicitud de crédito",
        mainPath: "cascrev",
        mainSrc: "assets/icon/money-check-alt-solid.svg"

      }
      
    ];
  }

 private  GetTabs(): mainMenu[] {
    return this.tabs;
  }
}
