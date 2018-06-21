import { Dialogs } from '@ionic-native/dialogs';
import {Injectable} from "@angular/core";
import { constants } from '../constants/constants';
import { App } from 'ionic-angular';
import { HomePage } from '../pages/home/home';

declare var navigator: any;
@Injectable()
export class AlertService {

    constructor(private dialogs: Dialogs, protected app: App) {

    }

    showAlert(message: string, title: string, buttonLabels: string[], action: string, url?: string): void {
        this.dialogs.confirm(
            message,
            title,
            buttonLabels)
            .then((result) => {
                if (result === 1) {
                    if (action === constants.exitApp) {
                        navigator.app.exitApp();
                    } else if (action === constants.showDocs) {
                      let hideFooterTimeout = setTimeout( () => {
                        this.app.getActiveNav().setRoot(HomePage);
                      }, 2000);
                        window.open(url, '_system');
                    }
                } else {
                    if (action === constants.showDocs) {
                        this.app.getActiveNav().setRoot(HomePage);
                    }
                }
            });
    }
}