import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { appRoutes } from './directives/routers';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
 import { RouterModule } from '@angular/router';

 
// Firebase integration

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { RegisterComponent } from './pages/register/register.component';
import { PlayerComponent } from './pages/player/player.component';
import { ChooseVideoComponent } from './pages/choose-video/choose-video.component';
import { GoogleService } from './providers/google.services';
import { LoginComponent } from './pages/login/login.component';
 
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Firebase configration
export const firebaseConfig = {
  apiKey: 'AIzaSyCS8Ajivy0OSI4FjZq4c_qaH6m82nosqvo',
    authDomain: 'gengoo-app.firebaseapp.com',
    databaseURL: 'https://gengoo-app.firebaseio.com',
    projectId: 'gengoo-app',
    storageBucket: 'gengoo-app.appspot.com',
    messagingSenderId: '702391691615'
};
firebase.initializeApp(firebaseConfig);



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    WebviewDirective,
    PlayerComponent,
    ChooseVideoComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
     AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService,GoogleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
