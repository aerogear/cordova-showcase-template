import { SecurityCheckResult, SecurityCheckType, SecurityService } from "@aerogear/security";
import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: "page-storage",
  templateUrl: "storage.html",
  providers: [StorageService]
})
export class StoragePage {
  public notes: any;
  public securityService: SecurityService;

  constructor(private storageService: StorageService, public navCtrl: NavController, public alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.storageService = storageService;
    this.alertCtrl = alertCtrl;
    this.notes = [];
    this.securityService = new SecurityService();
    }

  public listNotes() {
    this.storageService.getNotes().then((notes) => {
      this.notes = notes;
    })
    .catch((err) => console.error("Error retrieving notes", err));
  }

  public createNote(title: string, content: string) {
    this.storageService.createNote(title, content).then((notes) => {
      this.listNotes();
    });
  }

  public deviceLockCheck() {
    this.securityService.check(SecurityCheckType.hasDeviceLock)
    .then((deviceLockEnabled: SecurityCheckResult) => {
      if (!deviceLockEnabled.passed) {
        this.deviceLockToast();
      } else {
        this.showCreateModal();
      }
    });
  }

  public deviceLockToast() {
    this.toastCtrl.create({
      message: "No Device Lock Detected. Enable to use Storage",
      duration: 3000
    }).present();
  }

  public showCreateModal() {
    const alert = this.alertCtrl.create({
      title: "Create Secure Note",
      inputs: [
        {
          name: "title",
          placeholder: "Title"
        },
        {
          name: "content",
          placeholder: "Content"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Create",
          handler: data => {
            if (data.title) {
              this.createNote(data.title, data.content);
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  public readNote(note: any) {
  const alert = this.alertCtrl.create({
      title: note.title,
      subTitle: note.content,
      buttons: ["Dismiss"]
    });
  alert.present();
  }

  public ionViewDidEnter(): void {
    this.listNotes();
  }

}
