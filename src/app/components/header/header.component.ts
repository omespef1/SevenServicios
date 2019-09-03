import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() headerName:string;
  constructor(private _auth: AuthService,private _rout:Router) { }

  ngOnInit() {


  }

  logged(){
    console.log(this._auth.loadUser());
  return this._auth.loadUser()!=null;
  }
  logOut(){
    this._auth.signOut();
  }

  goMenu(){
  this._rout.navigateByUrl('tabs/menu');
  }
}
