import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Push, PushObject} from '@ionic-native/push';

@Component({
    selector: 'page-push',
    templateUrl: 'push.html'
})
export class PushPage {
    pushObject: PushObject;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, push: Push) {

        this.pushObject = push.init({
            android:{},
            ios: {
                alert: true,
                badge: true,
                sound: true
            },
            windows: {}
        });

        this.pushObject.on('registration').subscribe(data => {
            console.log("Push registration event");
            console.log(data);
        });

    }

    ionViewDidEnter(): void {
        console.log("Push view enter");
    }

}
