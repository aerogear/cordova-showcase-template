import {Injectable} from "@angular/core";
import { ToastController } from "ionic-angular";

/**
 * Wraps the ionic ToastController and provider a simplified interface to trigger
 * success and error messages
 */
@Injectable()
export class SimpleToastService {
  constructor(public toastCtrl: ToastController) {
  }

  public showSuccess(msg: string, position: string = "top") {
    this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position,
      cssClass: "toast-success"
    }).present();
  }

  public showError(msg: string, position: string = "top") {
    this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position,
      cssClass: "toast-error"
    }).present();
  }
}
