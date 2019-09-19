import { Injectable } from '@angular/core';
import { ComunicationsService } from './comunications.service';

@Injectable({
  providedIn: 'root'
})
export class ClassSpacesService {

  constructor(private  _comunications:ComunicationsService) { }


  GetClassSpaces(){
    return  this._comunications.Get('aeclase?');
   }
   GetClassSpace(booking:any){
      return  this._comunications.Get(`aeclase/GetAeClase?cla_cont=${booking.Cla_cont}`);
   }
}
