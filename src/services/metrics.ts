import { MetricsService } from '@aerogear/core';
import appConfig from "../mobile-services.json";

export var metrics: MetricsService;

// Create metrics
export function initMetrics() {
  metrics = new MetricsService(appConfig);
  metrics.sendAppAndDeviceMetrics()
    .then((response) => {
      console.info("Response from metrics", response)
    }).catch((error) => {
      console.error("Error when sending metrics", error)
    });
}

