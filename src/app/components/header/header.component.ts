import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() headerName:string;
  constructor(private _auth: AuthService) { }

  ngOnInit() {


  }

  logged(){
  return this._auth.stroToken!="";
  }

}
