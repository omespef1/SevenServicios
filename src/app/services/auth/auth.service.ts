import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject, observable } from "rxjs";
import { filter, tap, take, map } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { loginRequest } from "src/app/models/general/totransaction";
import { TOAccess } from "../../models/general/totransaction";
import { HttpManagerService } from '../httpManager/http-manager.service';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: "root"
})
export class AuthService  {  
   public stroToken:string;
  constructor(
    private router: Router,
    private storage: Storage,
    private _http:HttpManagerService
    // private fb: Facebook
  ) {
    this.loadUser();
  }

   loadUser() {
    return JSON.parse(localStorage.getItem('user'));      
  }
  signIn(credentials: loginRequest) {  
    console.log(credentials);
    return this._http.Post<TOAccess>("/login/authenticate",credentials).pipe(
      tap(async (userData: TOAccess) => {
        if (userData) {
          if (userData.codeResult === 0) {           
           localStorage.setItem("user", JSON.stringify(userData));         
          }
        }
      })
    );
  }


  loginWithFacebook(){
   
  }

  

   Get<T>(urlController:string){      
               
   return this._http.Get<T>(urlController, JSON.parse(localStorage.getItem('user')));         
  }
  Post<T>(urlController:string,body:any){
    return this._http.Post<T>(urlController,body);
  }
  async signOut() {
    localStorage.setItem('user',null) ;
    this.stroToken="";
    this.router.navigateByUrl("/login");
  }


}
