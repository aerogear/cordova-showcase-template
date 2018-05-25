import {Push} from "@ionic-native/push";

declare var require: any;

export let pushProvider = {
  provide: Push,
  useClass: Push,
  deps: []
};