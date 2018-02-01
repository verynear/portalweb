import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private data = {};

  constructor() {
    // customer.betterleasing.com
    // customer.stage.betterleasing.com
    // customer.devdemo.betterleasing.com
    // localhost
    const parts = location.hostname.split('.'),
      site = parts.shift(),
      host = parts.join('.') || 'devdemo.betterleasing.com';

    this.data = {
      api: {
        baseURL: `${location.protocol}//api.${host}` + "/leasenet"
      },
      customer: {
        subdomain: site,
        host
      }
    };
  }

  get(): any {
    return this.data;
  }

}
