import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
@NgModule({
  declarations: [AppComponent,    GnemprePage,GnconexPage],
  entryComponents: [
    GnemprePage,GnconexPage
  ],
  imports: [
    BrowserModule, 
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
