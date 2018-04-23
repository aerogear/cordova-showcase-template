import { config } from "../services/config"
import { MetricsService } from '@aerogear/core';

export var metrics: MetricsService;

// Create metrics
export function initMetrics() {
  let metricsConfig = config.getConfig(MetricsService.ID);
  metrics = new MetricsService(metricsConfig);
  metrics.sendAppAndDeviceMetrics().then((response) => {
    console.info("Response from metrics", response)
  }).catch((error) => {
    console.error("Error when sending metrics", error)
  });
}

