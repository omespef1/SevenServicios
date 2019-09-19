import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionComponent } from "./components/accordion/accordion.component";
import { Routes, Router, RouterModule } from "@angular/router";

import { BrowserTab } from "@ionic-native/browser-tab/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ClassSpacesPage } from "./pages/class-spaces/class-spaces.page";
import { DigitalDatePipe } from "./pipes/digital-date.pipe";
import { IonicModule } from "@ionic/angular";
import { BookingPage } from "./pages/booking/booking.page";
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/booking/booking.module").then(m => m.BookingPageModule)
  },
  {
    path: "classSpaces",
    loadChildren: () =>
      import("./pages/class-spaces/class-spaces.module").then(
        m => m.ClassSpacesPageModule
      )
  }
];

@NgModule({
  declarations: [
    BookingPage,
    ClassSpacesPage,
    DigitalDatePipe,
  ],
  entryComponents: [ClassSpacesPage, BookingPage],
  imports: [
    FormsModule,
    CommonModule, 
    IonicModule, 
    RouterModule.forChild(routes)],
  providers: [BrowserTab, InAppBrowser, DigitalDatePipe]
})
export class AereserModule {}
