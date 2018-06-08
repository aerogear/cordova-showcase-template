import { Injectable } from "@angular/core";
import { Component } from "@angular/core";
import { SecureStorage, SecureStorageObject } from "@ionic-native/secure-storage";
import { AlertController } from "ionic-angular";

@Injectable()
@Component({
  providers: [SecureStorage, SecureStorageObject]
})
/**
 * Contains properties of the Storage Service.
 */
export class StorageService {
  public notes: Array<{title: string, content: string}>;
  public KEYSTORE_ALIAS: string = "keystore_mobile";
  public secureStorageObject: SecureStorageObject;

  /**
  * @param alertCtrl The ionic alert controller
  */
  constructor(public alertCtrl: AlertController, private secureStorage: SecureStorage) {
    this.alertCtrl = alertCtrl;
    this.notes = [];

    this.secureStorage.create(this.KEYSTORE_ALIAS)
    .then((storage: SecureStorageObject) => {
       this.secureStorageObject = storage;
    });
  }

  public getNotes() {
    return new Promise((resolve, reject) => {
      this.secureStorageObject.get(this.KEYSTORE_ALIAS)
        .then(
          data => resolve(JSON.parse(data)),
          error => resolve([])
      );
    });
  }

  public createNote(title: string, content: string) {
    let keystoreItems: any;
    const newNote = {title, content};

    return new Promise((resolve, reject) => {
    this.getNotes().then((notes) => {
      keystoreItems = notes;
      keystoreItems.push(newNote);

      this.secureStorageObject.set(this.KEYSTORE_ALIAS, JSON.stringify(keystoreItems))
         .then(
           data => resolve(keystoreItems),
           error => reject(error)
       );
    })
    .catch((err) => console.error("Error retrieving notes", err));
    });
  }
}
