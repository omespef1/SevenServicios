import { Component, OnInit } from '@angular/core';
import { factory } from '../../models/models';
import { ClassSpacesService } from '../../services/class-spaces.service';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-spaces',
  templateUrl: './class-spaces.page.html',
  styleUrls: ['./class-spaces.page.scss'],
})
export class ClassSpacesPage implements OnInit {
  typeSpaces:any[];
  constructor(private  _classSpaces:ClassSpacesService,private _general:GeneralService,private _route:Router) { }

  ngOnInit() {
  }


  ionViewDidLoad() {
    this.GetClassSpaces();
  }
  GetClassSpaces($event?:any){
    this._classSpaces.GetClassSpaces().then((resp:any)=>{

      if(resp!=null){
        this.typeSpaces = resp.ObjTransaction;
        if($event) $event.target.complete();

      }
    })
  }
  SetSpaceType(ClassSpace:any){
  //  let newRequest: disponibilityRequest = new disponibilityRequest();
  let newFactory:factory = new factory();
  newFactory.class = ClassSpace;
   this._route.navigateByUrl('classSpaces')
  }
doRefresh($event)
{
  this.GetClassSpaces($event);
}
showDetail(typeSpace:any){
  this._general.ShowMessageAlert('Descripción', typeSpace.Cla_desc)
}
}
