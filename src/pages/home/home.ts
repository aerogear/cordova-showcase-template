import { Auth } from "@aerogear/auth";
import { Component } from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import { authProvider } from "../../services/auth.service";
import {PushService} from "../../services/push.service";
import {PushNotification} from "../push/notification";
import {PushPage} from "../push/push";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [authProvider]
})
export class HomePage {
  constructor(private navCtrl: NavController, push: PushService, plt: Platform, public auth: Auth) {
    // We need to wait for the platform to initialize the plugins
    plt.ready().then(() => {
      push.initPush();
      push.setCallback((n) => this.addNotification(n));
      push.register();
    });
  }

  public addNotification(notification: PushNotification) {
    console.debug(`Received push notification: ${notification.message}`);
    const currentPage = this.navCtrl.getActive(true).name;

    // Navigate to push page only if we aren't already there
    if (PushPage.name !== currentPage) {
      this.navCtrl.push(PushPage);
    }
  }
}
