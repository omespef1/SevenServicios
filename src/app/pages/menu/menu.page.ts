import { Component, OnInit } from '@angular/core';
import { mainMenu } from 'src/app/models/general/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {

  pagesMenu : mainMenu[] =[
    {mainIcon:'',mainTitle:'Planes',mainPath:'gmplane',mainSrc:'assets/icon/dumbbell-solid.svg'},
    {mainIcon:'bicycle',mainTitle:'Eventos deportivos',mainPath:'dtendep',mainSrc:''},
    {mainIcon:'contact',mainTitle:'Tercera edad',mainPath:'tecuter',mainSrc:''},
    {mainIcon:'',mainTitle:'Planes turísticos',mainPath:'tuplatu',mainSrc:'assets/icon/globe-africa-solid.svg'},
    {mainIcon:'school',mainTitle:'Cursos',mainPath:'etcurso',mainSrc:''},
    {mainIcon:'school',mainTitle:'Cursos',mainPath:'plcacul',mainSrc:''}
  ]
  constructor(private _route:Router) { }

  ngOnInit() {
  }

  GoMenu(main:mainMenu){
    this._route.navigateByUrl(`tabs/${main.mainPath}`);
  }

}
