import { Auth } from "@aerogear/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { authProvider } from "../../services/auth.service";

import { AuthDetailsPage } from "../authDetails/authDetails";

@Component({
    selector: "page-auth",
    templateUrl: "auth.html",
    providers: [authProvider]
})
export class AuthPage {
    public authButtonState: boolean;

    constructor(public toastCtrl: ToastController, private auth: Auth, public navCtrl: NavController, public navParams: NavParams) {
        this.auth = auth;
        this.authButtonState = true;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
    }

    public login() {
        this.auth.login()
            .then(() => this.navCtrl.setRoot(AuthDetailsPage));
    }

    public ionViewDidEnter(): void {
        if (this.auth.isAuthenticated()) {
            this.navCtrl.setRoot(AuthDetailsPage);
        }
    }
}
