import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() headerName:string;
  constructor(private _auth: AuthService,private _rout:Router,private _nav:NavController) { }

  ngOnInit() {


  }

  logged(){
   
  return this._auth.loadUser()!=null;
  }
  logOut(){
    this._auth.signOut();
  }

  goMenu(){
  // this._rout.navigateByUrl('tabs/menu');
  this._nav.navigateForward('tabs/menu');
  }

  goProfile(){
    this._nav.navigateForward('tabs/profile');
  }
}
