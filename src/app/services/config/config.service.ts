import { Injectable } from '@angular/core';
import { gnconex } from 'src/app/models/gn/gnconex';
import { developerUrl, developerMode } from 'src/assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {


  }

  Get(): gnconex {
     
    if (developerMode) {
      const data :gnconex= JSON.parse(localStorage.getItem('GnConex'));
      data.CNX_IPSR = developerUrl;
      return data;
    }
    else {
      return JSON.parse(localStorage.getItem('GnConex'));
    }


  }
}
