import { Component, Input, OnInit } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { PlasistService } from '../../../services/pl/plasist.service';
import { AlertService } from '../../../services/alert/alert.service';
import { plasise } from '../../../models/pl/plasist';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-plasist-estu',
  templateUrl: './plasist-estu.page.html',
  styleUrls: ['./plasist-estu.page.scss'],
})
export class PlasistEstuPage implements OnInit {
  @Input() asi_cont;
  loading = false;
  user: TOAccess;
  Plasise: plasise[];
  textoBuscar = '';
  
  constructor(private _service: PlasistService,
              private _alert: AlertService,
              private _modal: ModalController) { }

  ngOnInit() {
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.getEstudiantes(user, this.asi_cont).subscribe((resp: ToTransaction) => {
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
        this.CerrarModal();
      }
      else {
        this.Plasise = resp.ObjTransaction;
      }
      this.loading = false;
      console.log(resp);
    });
  }

  setAplicar() {    
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.MarcarAsist(user, this.Plasise.filter(b => b.das_asis == true)).subscribe((resp: ToTransaction) => {
      if (resp.Retorno == 1) {
        this._alert.error(resp.TxtError);
      }
      else {
        this._service.CambiarEstado(user, this.asi_cont, 'A').subscribe((resp: ToTransaction) => {
          if (resp.Retorno == 1) {
            this._alert.error(resp.TxtError);
          }
          else {
            this.CerrarModal();
          }
        });    
      }
    });    
  }

  CerrarModal() {
    this._modal.dismiss();
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

}
