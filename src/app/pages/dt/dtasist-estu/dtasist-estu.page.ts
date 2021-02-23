import { Component, Input, OnInit } from '@angular/core';
import { DtasistService } from '../../../services/dt/dtasist.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ModalController } from '@ionic/angular';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { dtasise } from '../../../models/dt/dtasist';

@Component({
  selector: 'app-dtasist-estu',
  templateUrl: './dtasist-estu.page.html',
  styleUrls: ['./dtasist-estu.page.scss'],
})
export class DtasistEstuPage implements OnInit {
  @Input() asi_cont;
  loading = false;
  user: TOAccess;
  Dtasise: dtasise[];
  textoBuscar = '';

  constructor(private _service: DtasistService,
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
        this._alert.showAlert('Retorno', resp.TxtError);
        this.CerrarModal();
      }
      else {
        this.Dtasise = resp.ObjTransaction;
      }
      this.loading = false;
      console.log(resp);
    });
  }

  setAplicar() {    
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.MarcarAsist(user, this.Dtasise.filter(b => b.das_asis == true)).subscribe((resp: ToTransaction) => {
      if (resp.Retorno == 1) {
        this._alert.showAlert('Retorno', resp.TxtError);
      }
      else {
        this._service.CambiarEstado(user, this.asi_cont, 'A').subscribe((resp: ToTransaction) => {
          if (resp.Retorno == 1) {
            this._alert.showAlert('Retorno', resp.TxtError);
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
