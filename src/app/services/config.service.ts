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
      host = parts.join('.') || 'devdemo.betterleasing.com',
      local = parts[0]; // for localhost.

    this.data = {
      api: {
        baseURL: `${location.protocol}//api.${host}` + '/leasenet'
      },
      customer: {
        subdomain: site || local,
        host
      },
      environments: ['devdemo', 'stage', 'api', 'localhost']
    };
  }

  get(): any {
    const parts = location.hostname.split('.'),
      site = parts.shift(),
      host = parts.join('.') || 'devdemo.betterleasing.com',
      local = parts[0]; // for localhost.

    console.log('Parts');
    console.log(parts);

    console.log('Site');
    console.log(site);

    console.log('Host');
    console.log(host);

    console.log('Local');
    console.log(local);


    console.log('Returning from Config Service');
    return this.data;
  }

}
