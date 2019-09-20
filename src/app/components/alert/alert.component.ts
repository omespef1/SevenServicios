import { Component, OnInit, Input, OnDestroy } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit, OnDestroy {
  alertType: string;
   message: string;
  visible: boolean = false;
  constructor() {}
  show(msg:string,type:string) {
    this.visible = true;
    this.alertType=type;
    this.message= msg;
  }
  hide(){
    this.visible=false;
    this.alertType="";
    this.message= ""
  }
  ngOnInit() {


  }
  ngOnDestroy(): void {
    this.visible=false;
    this.alertType="";
    this.message="";
    
  }
}
