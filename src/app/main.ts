import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../app/app.module';
import { INSTANCE } from "../services/auth.service"

const platform = platformBrowserDynamic();
// Init angular
platform.bootstrapModule(AppModule);

if (window['cordova']) {
  document.addEventListener("deviceready", initAuth, false);
} else {
  // Init for the web
  initAuth();
}

/**
 * Initializes Auth auth and creates main angular context
 * This will reload angular context again
 */
function initAuth() {
  window['handleOpenURL'] = function (url) {
    if(url.indexOf("login") !== -1 ){
      INSTANCE.continueLogin(url);
    }
    else if (url.indexOf("logout") !== -1) {
      INSTANCE.continueLogout();
    }
  }
  INSTANCE.init({ adapter: "default" }).then(() => {
    console.info("Initialized auth SDK")
  }).catch((err) => {
    console.error("Problem with auth init", err)
  });
}