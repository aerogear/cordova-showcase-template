import { AuthService } from '@aerogear/auth';
import { coreInstance } from '@aerogear/core';

declare var require: any
let appConfig = require("../mobile-services.json");

coreInstance.init(appConfig);

export let INSTANCE = new AuthService();

export let keycloakFactory = () => {
  return INSTANCE
};

export let authProvider = {
  provide: AuthService,
  useFactory: keycloakFactory,
  deps: []
}



