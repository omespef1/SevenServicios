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
  // user: Observable<any>;
  // public authState = new BehaviorSubject(null);
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
            // this.authState.next(userData.objResult);
           localStorage.setItem("user", JSON.stringify(userData));
            // console.log(this.authState.value);
            // return of(userData.objResult);
          }
        }
      })
    );
  }


  loginWithFacebook(){
    // this.fb.login(['public_profile', 'user_friends', 'email'])
  // .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  // .catch(e => console.log('Error logging into Facebook', e));
  }

  

   Get<T>(urlController:string){      
               
   return this._http.Get<T>(urlController, JSON.parse(localStorage.getItem('user')).strToken);         
  }
  Post<T>(urlController:string,body:any){
    return this._http.Post<T>(urlController,body);
  }
  async signOut() {
    await this.storage.set("user", null);   
    this.stroToken="";
    this.router.navigateByUrl("/login");
  }


}
