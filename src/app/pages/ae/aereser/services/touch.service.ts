import { Injectable } from "@angular/core";
import { KeychainTouchId } from '@ionic-native/keychain-touch-id/ngx'

@Injectable({
  providedIn: "root"
})
export class TouchService {
  constructor(private _touch: KeychainTouchId) {}

  isAvailable() {
    return this._touch.isAvailable();
  }

  delete(data:string) {
    this._touch.delete("fingerprint");
  }
}
