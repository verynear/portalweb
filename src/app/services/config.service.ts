import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private data = {};

  constructor() {
    // customer.betterleasing.com
    // customer.stage.betterleasing.com
    // customer.devdemo.betterleasing.com
    // localhost

    const parts = location.hostname.split('.');
    const site = parts.shift();
    const host = parts.join('.') || 'devdemo.betterleasing.com';
    const branch = host.split('.')[0];

    this.data = {
      api: {
        baseURL: `${location.protocol}//api.${host}` + '/leasenet'
      },
      customer: {
        subdomain: site,
        host: branch
      },
      environments: ['devdemo', 'stage', 'api', 'localhost']
    };
  }

  get(): any {
    console.log('About to return: Config Service');
    console.log(this.data);
    return this.data;
  }

}
