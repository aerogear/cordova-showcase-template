import { Component } from "@angular/core";
import { Refresher } from "ionic-angular";
import { PushService } from "../../services/push.service";
import { PushNotification } from "./notification";

@Component({
  selector: "page-push",
  templateUrl: "push.html"
})
export class PushPage {
  public messages: PushNotification[] = null;

  constructor(private push: PushService) {
    this.messages = push.messages;
  }

  public disablePush() {
    this.push.unregister();
  }

  public doRefresh(refresher: Refresher) {
    this.messages = this.push.messages;
    refresher.complete();
  }

  public buttonVisible() {
    return PushService.registered;
  }
}
