import { Component, OnInit } from "@angular/core";
import { CascrevService } from "../../../services/cf/cascrev.service";
import { AuthService } from "../../../services/auth/auth.service";
import { cascrev } from "../../../models/cf/cascrev";
import { TOAccess } from '../../../models/general/totransaction';

@Component({
  selector: "app-cascrev",
  templateUrl: "./cascrev.page.html",
  styleUrls: ["./cascrev.page.scss"]
})
export class CascrevPage implements OnInit {
  user: TOAccess;
  cascrev: cascrev[];
  loading = false;
  constructor(private _service: CascrevService,
              private auth: AuthService) {
    this.user = auth.loadUser();
  }

  ngOnInit() {
    this.GetCaScrev();
  }
  GetCaScrev($event?:any) {
    this.loading = true;
    this._service.GetCaScrev(this.user).subscribe(resp => {
      console.log(resp)   ;
      this.cascrev = resp.ObjTransaction;
      if ($event) $event.target.complete();
      this.loading = false;
    });
  }

  doRefresh($event){
     this.GetCaScrev($event);
  }
}
