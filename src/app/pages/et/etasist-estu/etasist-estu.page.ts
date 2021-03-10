import { Component, OnInit, Input } from '@angular/core';
import { TOAccess, ToTransaction } from '../../../models/general/totransaction';
import { EtDasis } from '../../../models/et/etasist';
import { EtasistService } from '../../../services/et/etasist.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-etasist-estu',
  templateUrl: './etasist-estu.page.html',
  styleUrls: ['./etasist-estu.page.scss'],
})
export class EtasistEstuPage implements OnInit {
  @Input() asi_cont;
  loading = false;
  user: TOAccess;
  etdasis: EtDasis[];
  textoBuscar = '';

  constructor(private _service: EtasistService,
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
        this.etdasis = resp.ObjTransaction;
      }
      this.loading = false;
      console.log(resp);
    });
  }

  setAplicar() {    
    this.loading = true;
    let user: TOAccess = JSON.parse(localStorage.getItem("user"));
    this._service.MarcarAsist(user, this.etdasis.filter(b => b.das_asis == true)).subscribe((resp: ToTransaction) => {
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
