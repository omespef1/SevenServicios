import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  textoBuscar = '';

  constructor(private _modal: ModalController) { }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  ngOnInit() {
  }

  CerrarModal() {
    this._modal.dismiss();
  }
}
