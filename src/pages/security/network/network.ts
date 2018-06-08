import { Auth } from "@aerogear/auth";
import { Component } from "@angular/core";
import { ToastController } from "ionic-angular";
import { NavController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { authProvider } from "../../../services/auth.service";

import { Http } from "@angular/http";

import {RequestOptions} from "@angular/http";
import {Headers} from "@angular/http";
import "rxjs/add/operator/map";
declare let window: any;

@Component({
  selector: "page-network",
  templateUrl: "network.html",
  providers: [authProvider]
})
export class NetworkPage {
  public apiAccessRole: string;
  public progress: number;
  public headerConfig: object;
  public apiServerUrl: string;
  public apiEndpoint: string;
  public pinningSuccess: boolean;
  public responseRecieved: boolean;
  public requestSuccess: boolean;
  public requestFailure: boolean;
  public configuration: any;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, private auth: Auth, public navCtrl: NavController, public http: Http) {
    this.auth = auth;
    this.configuration = auth.getConfig();
    this.toastCtrl = toastCtrl;
    this.loadingCtrl = loadingCtrl;
    this.navCtrl = navCtrl;
    this.http = http;
    this.apiAccessRole = "api-access";
    this.headerConfig = {
      "Accept": "application/json",
      "Authorization": "Bearer " + this.auth.extract().token
    };
    this.apiServerUrl = this.configuration.apiServerUrl;
    this.apiEndpoint = this.configuration.apiEndpoint;
    this.pinningSuccess = false;
    this.responseRecieved = false;
    this.requestFailure = false;
  }

  public sendRequest() {
    const loader = this.loadingCtrl.create({
      content: "Checking Connection.."
    });
    loader.present();

    const headers = new Headers(this.headerConfig);
    const options = new RequestOptions({headers});

    const server = this.apiServerUrl;
    const fingerprint = this.configuration.pinningFingerprint;

    window.plugins.sslCertificateChecker.check(
            function() {
                loader.dismiss();
                this.pinningSuccess = true;
                this.responseRecieved = true;
                this.http.get(this.apiServerUrl + this.apiEndpoint, options).subscribe(res => {
                  console.log(res.status);
                  if (res.status === 200) {
                    this.requestSuccess = true;
                  } else {
                    this.requestFailure = true;
                  }
                }, err => {
                  this.requestFailure = true;
                });
            }.bind(this),
            function(message) {
              loader.dismiss();
              if (message === "CONNECTION_NOT_SECURE") {
                const toast = this.toastCtrl.create({
                   message: "Connection Not Secure.",
                   duration: 10000,
                   position: "bottom"
                 });

                toast.present();
              }
            }.bind(this),
            server,
            fingerprint
          );
          }
  }
