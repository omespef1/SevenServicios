import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject } from "rxjs";
import { filter, tap, take, map } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { loginRequest } from "src/app/models/general/totransaction";
import { TOAccess } from "../../models/general/totransaction";
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: "root"
})
export class AuthService  {
  user: Observable<any>;
  public authState = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private storage: Storage,
    private _http:HttpManagerService
  ) {
    this.loadUser();
    this.user = this.authState
      .asObservable()
      .pipe(filter(response => response));
  }

  loadUser() {
    this.storage.get("user").then((data: any) => {
      console.log('leyendo usuario');
      if (data) {
        console.log(data);
        this.authState.next(data);
      } else {
        console.log('borra usuario')
        this.authState.next(null);
      }
    });
  }
  signIn(credentials: loginRequest) {  
    console.log(credentials);
    return this._http.Post<TOAccess>("/login/authenticate",credentials).pipe(
      tap(async (userData: TOAccess) => {
        if (userData) {
          if (userData.codeResult === 0) {
            this.authState.next(userData.objResult);
            this.storage.set("user", userData);
            console.log(this.authState.value);
            return of(userData.objResult);
          }
        }
      })
    );
  }

  Get<T>(urlController:string){

   let token =  this.user.pipe(take(1),map(user=>{
    
      return user['strToken'];
    
  }))
    console.log(token);
     return this._http.Get<T>(urlController,this.authState.value.strToken);
  }
  Post<T>(urlController:string,body:any){
    return this._http.Post<T>(urlController,body);
  }
  async signOut() {
    await this.storage.set("user", null);
    this.authState.next(null);
    this.router.navigateByUrl("/login");
  }
}
