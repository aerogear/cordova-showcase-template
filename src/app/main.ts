import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "../app/app.module";
import { INSTANCE } from "../services/auth.service";

const platform = platformBrowserDynamic();
// Init angular
platform.bootstrapModule(AppModule);

if ((window as any).cordova) {
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
  INSTANCE.init({}).then(() => {
    console.info("Initialized auth SDK");
  }).catch((err) => {
    console.error("Problem with auth init", err);
  });
}
