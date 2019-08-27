import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
 
const TOKEN_KEY = 'user-access-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  private authState = new BehaviorSubject(null);
 
  constructor(private router: Router, private storage: Storage) {
    this.loadUser();
 
    // Filter out null values which is first behaviour Subject value
    this.user = this.authState
      .asObservable()
      .pipe(filter(response => response));
  }
 
  loadUser() {
    // Normally load e.g. JWT at this point
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        this.authState.next(data);
      } else {
        this.authState.next({ email: null, role: null });
      }
    });
  }
 
  signIn(credentials) {
    let email = credentials.email;
    let pw = credentials.pw;
    let user = null;
 
    if (email === 'admin' && pw === 'admin') {
      user = { email, role: 'ADMIN' };
    } else if (email === 'user' && pw === 'user') {
      user = { email, role: 'USER' };
    }
 
    this.authState.next(user);
 
    // Normally you would store e.g. JWT
    this.storage.set(TOKEN_KEY, user);
 
    // Normally you would have a real user object at this point
    return of(user);
  }
 
  async signOut() {
    await this.storage.set(TOKEN_KEY, null);
    this.authState.next(null);
    this.router.navigateByUrl('/login');
  }
}