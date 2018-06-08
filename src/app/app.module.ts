import { ErrorHandler, Injector, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { AuthPage } from "../pages/auth/auth";
import { AuthDetailsPage } from "../pages/authDetails/authDetails";
import { HomePage } from "../pages/home/home";
import { AccessControlPage } from "../pages/security/accessControl/accessControl";
import { DeviceTrustPage } from "../pages/security/deviceTrust/deviceTrust";
import { NetworkPage } from "../pages/security/network/network";
import { StoragePage } from "../pages/security/storage/storage";

import { SecureStorage } from "@ionic-native/secure-storage";
import { authProvider } from "../services/auth.service";

import {PushPage} from "../pages/push/push";
import {PushService} from "../services/push.service";
import {SimpleToastService} from "../services/toast.service";
import { SideMenuContentComponent } from "../shared/side-menu-content/side-menu-content.component";

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
    SimpleToastService,
    PushService,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  // Make the injector to be available in the entire module
  // so we can use it in the custom decorator
  public static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }}
