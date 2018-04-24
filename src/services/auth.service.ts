import { AuthService } from '@aerogear/auth';

declare var require: any
let appConfig = require("../mobile-services.json");

export let INSTANCE = new AuthService(appConfig);

export let keycloakFactory = () => {
  return INSTANCE
};

export let authProvider = {
  provide: AuthService,
  useFactory: keycloakFactory,
  deps: []
}



