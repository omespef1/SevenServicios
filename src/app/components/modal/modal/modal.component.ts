import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ModalModel } from '../../../models/general/modal.model';
import { Item } from '../../../models/general/items';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() source: ModalModel;

  data: Item[] = [];
  constructor(private modalController: ModalController, navParams: NavParams) {
    this.source = navParams.get('source');
    this.data = this.source.source;
  }



  ngOnInit() {


  }

  async chooseItem(item?: Item) {
    await this.modalController.dismiss(item);
  }

  cleanFilter() {
    this.data = this.source.source;
  }

  search(event) {
    this.cleanFilter();
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.data = this.data.filter(v => v.name.toLowerCase().indexOf(query) > -1);
    });
  }
}
