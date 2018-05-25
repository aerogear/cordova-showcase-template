import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { DeviceTrustPage } from '../pages/security/deviceTrust/deviceTrust';
import { AuthDetailsPage } from '../pages/authDetails/authDetails';
import { AccessControlPage } from '../pages/security/accessControl/accessControl';
import { NetworkPage } from '../pages/security/network/network';
import { StoragePage } from '../pages/security/storage/storage';

import { authProvider } from '../services/auth.service';
import { SecureStorage } from '@ionic-native/secure-storage';

import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import {PushPage} from "../pages/push/push";
import {pushProvider} from "../services/push.service";
import {Push} from "@ionic-native/push";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    PushPage,
    AuthDetailsPage,
    AccessControlPage,
    DeviceTrustPage,
    NetworkPage,
    StoragePage,
    SideMenuContentComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    PushPage,
    AuthDetailsPage,
    AccessControlPage, 
    DeviceTrustPage,
    NetworkPage,
    StoragePage,
    SideMenuContentComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    authProvider,
    pushProvider,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {  
  // Make the injector to be available in the entire module
  // so we can use it in the custom decorator
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }}
