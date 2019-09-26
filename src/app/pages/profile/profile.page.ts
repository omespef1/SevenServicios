import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SessionsService } from '../../services/sessions/sessions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private _route:Router,private auth:AuthService,private _sesion:SessionsService) { }

  ngOnInit() {
  }

  goSuAfili(){
  this._route.navigateByUrl('tabs/suafili');
  }
  goOut(){
  this.auth.signOut();
  }
  erraseData(){
    this._sesion.erraseStorage();
    this.auth.signOut();
    this._route.navigateByUrl('tabs/menu');
  }

}
