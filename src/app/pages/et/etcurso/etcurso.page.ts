import { Component, OnInit } from "@angular/core";
import { HttpManagerService } from "../../../services/httpManager/http-manager.service";
import { etcurso } from "../../../models/et/etcurso";

@Component({
  selector: "app-etcurso",
  templateUrl: "./etcurso.page.html",
  styleUrls: ["./etcurso.page.scss"]
})
export class EtcursoPage implements OnInit {
  etcurso: etcurso[] = [];
  constructor(private _http: HttpManagerService) {}

  ngOnInit() {
    this.GetEtCurso();
  }

  GetEtCurso() {
    this._http.Get("/etcurso").subscribe(resp => {
    console.log(resp);
      this.etcurso= resp.ObjTransaction;
    });
  }
}
