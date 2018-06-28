import { Component } from '@angular/core';
import { authProvider } from '../../services/auth.service';
import { Auth } from '@aerogear/auth';

import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AuthPage } from '../auth/auth';

@Component({
    selector: 'page-authDetails',
    templateUrl: 'authDetails.html',
    providers: [authProvider]
})
export class AuthDetailsPage {
    profile: object;

    constructor(public toastCtrl: ToastController, private auth: Auth, public navCtrl: NavController) {
        this.auth = auth;
        this.profile = {};
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
    }

    logout() {
        this.auth.logout({ redirectUri: "org.aerogear.js.showcase:/logout" })
            .then(() => {
                this.navCtrl.setRoot(AuthPage);
            });
        let toast = this.toastCtrl.create({
            message: 'Logged Out Successfully',
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }

    ionViewDidEnter(): void {
        console.log(this.auth.hasRealmRole("uma_authorization"));
        if (this.auth.isAuthenticated()) {
            this.auth.loadUserProfile().then((userProfile) => {
                var realmRoles = this.auth.getRealmRoles();

                this.profile = {
                    username: userProfile.username ? userProfile.username : "Unknown Username",
                    firstName: userProfile.firstName ? userProfile.firstName : "Unknown First Name",
                    lastName: userProfile.lastName ? userProfile.lastName : "Unknown Last Name",
                    id: userProfile.id ? userProfile.id : "Unknown User ID",
                    email: userProfile.email,
                    totp: userProfile.totp ? userProfile.totp : false,
                    emailVerified: userProfile.emailVerified ? userProfile.emailVerified : false,
                    realmRoles: realmRoles
                };
            })
                .catch((err) => console.error("Error retrieving user profile", err));
        } else {
            this.navCtrl.setRoot(AuthPage);
            let toast = this.toastCtrl.create({
                message: 'Not Authenticated',
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
        }
    }
}
