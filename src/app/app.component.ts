import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { MenuController, Nav, Platform } from "ionic-angular";

import { AuthPage } from "../pages/auth/auth";
import { HomePage } from "../pages/home/home";
import { AccessControlPage } from "../pages/security/accessControl/accessControl";
import { DeviceTrustPage } from "../pages/security/deviceTrust/deviceTrust";
import { NetworkPage } from "../pages/security/network/network";
import { StoragePage } from "../pages/security/storage/storage";

// Side Menu Component
import { PushPage } from "../pages/push/push";
import { SideMenuOption } from "./../shared/side-menu-content/models/side-menu-option";
import { SideMenuSettings } from "./../shared/side-menu-content/models/side-menu-settings";
import { SideMenuContentComponent } from "./../shared/side-menu-content/side-menu-content.component";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  @ViewChild(SideMenuContentComponent) public sideMenu: SideMenuContentComponent;

  // Pages to show in the SideMenuContentComponent
  public pages: SideMenuOption[];

  // Settings for the SideMenuContentComponent
  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: "active-side-menu-option"
  };

  public rootPage: any = HomePage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    this.initializeApp();

  }

  public initializeOptions(): void {
    this.pages = new Array<SideMenuOption>();
    // used for an example of ngFor and navigation
    this.pages.push(
      { displayText: "Home", component: HomePage, iconName: "home" },
      { displayText: "Authentication", component: AuthPage, iconName: "lock" },
      { displayText: "Push",  component: PushPage, iconName: "radio" }
    );

    this.pages.push({
      displayText: "Security",
      suboptions: [
        { displayText: "Access Control", component: AccessControlPage, iconName: "key" },
        { displayText: "Device Trust", component: DeviceTrustPage, iconName: "phone-portrait" },
        { displayText: "Network", component: NetworkPage, iconName: "wifi" },
        { displayText: "Storage", component: StoragePage, iconName: "folder" }
      ]
    });
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.initializeOptions();
    });
  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close().then(() => {
      this.nav.setRoot(page.component);
    });
  }
}
