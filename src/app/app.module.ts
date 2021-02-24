import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Modulo de componentes
import { ComponentsModule } from './components/components.module';
import { IonicStorageModule } from '@ionic/storage';
import { GnemprePage } from './pages/gn/gnempre/gnempre.page';
import { GnconexPage } from './pages/gn/gnconex/gnconex.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { Facebook } from '@ionic-native/facebook/ngx';
import { TecasisAprtPage } from './pages/te/tecasis-aprt/tecasis-aprt.page';
import { PipesModule } from './pipes/pipes.module';
import { TecasisCaprPage } from './pages/te/tecasis-capr/tecasis-capr.page';
import { PlcasisAprtPage } from './pages/pl/plcasis-aprt/plcasis-aprt.page';
import { PlcasisCaprPage } from './pages/pl/plcasis-capr/plcasis-capr.page';
import { PlasistEstuPage } from './pages/pl/plasist-estu/plasist-estu.page';
import { FormsModule } from '@angular/forms';
import { TeasistEstuPage } from './pages/te/teasist-estu/teasist-estu.page';
import { DtasistEstuPage } from './pages/dt/dtasist-estu/dtasist-estu.page';
import { EtasistEstuPage } from './pages/et/etasist-estu/etasist-estu.page';

@NgModule({
  declarations: [AppComponent,    GnemprePage,GnconexPage, TecasisAprtPage, TecasisCaprPage, PlcasisAprtPage, PlcasisCaprPage, PlasistEstuPage, TeasistEstuPage, DtasistEstuPage, EtasistEstuPage],
  entryComponents: [
    GnemprePage, GnconexPage, TecasisAprtPage, TecasisCaprPage, PlcasisAprtPage, PlcasisCaprPage, PlasistEstuPage, TeasistEstuPage, DtasistEstuPage, EtasistEstuPage
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot(
      {
        
        mode: 'ios'
      }
    ),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PipesModule,
    FormsModule
  ],
  providers: [
    // Facebook,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
