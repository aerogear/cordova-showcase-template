import { ConfigurationHelper } from '@aerogear/core';

declare var require: any

var appConfig = require('../mobile-services.json');
export let config = new ConfigurationHelper(appConfig);
