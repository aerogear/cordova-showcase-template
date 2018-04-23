import { AuthService } from '@aerogear/auth';
import appConfig from "../mobile-services.json";

export let INSTANCE = new AuthService(appConfig);

export let keycloakFactory = () => {
  return INSTANCE
};

export let authProvider = {
  provide: AuthService,
  useFactory: keycloakFactory,
  deps: []
}



