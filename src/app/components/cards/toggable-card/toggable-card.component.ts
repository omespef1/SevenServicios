import { Component, OnInit, ViewChild, Renderer, Input,Output,EventEmitter } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-toggable-card',
  templateUrl: './toggable-card.component.html',
  styleUrls: ['./toggable-card.component.scss'],
   animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('450ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('450ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ]),
    trigger('slideOutIn', [
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('450ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('450ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class ToggableCardComponent implements OnInit {
  @ViewChild("cc",{static:false}) cardContent: any;
  @Input()title: string;
  @Input()subTitle: string;
  accordionExapanded = false;
  @Input()imgParam: string;
  isMenuOpen=false;
 
  constructor() { }

  ngOnInit() {

    // this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }



  toggleAccordion() {
this.isMenuOpen = !this.isMenuOpen;
    // this.isMenuOpen = !this.isMenuOpen;
    // if (this.accordionExapanded) {
    //   this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
    //   this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    // } else {
    //   this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "600px");
    //   this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");

    // }

    // this.accordionExapanded = !this.accordionExapanded;
  }

//   public broadcastName(name: string): void {
//     this.change.emit(name);
//  }
}
