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

    let site = '';
    if (parts[0] === 'localhost') {
      site = parts.shift();
    } else {
      parts.shift();  // remove axiom/1500 etc
      site = parts[1];
    }

    const host = parts.join('.') || 'devdemo.betterleasing.com';

    console.log('Host..');
    console.log(host);

    this.data = {
      api: {
        baseURL: `${location.protocol}//api.${host}` + '/leasenet'
      },
      customer: {
        subdomain: site,
        host
      },
      environments: ['devdemo', 'stage', 'api', 'localhost']
    };
  }

  get(): any {
    // const parts = location.hostname.split('.'),
    //   site = parts.shift(),
    //   host = parts.join('.') || 'devdemo.betterleasing.com';

    // console.log('Parts');
    // console.log(parts);

    // console.log('Site');
    // console.log(site);

    // console.log('Host');
    // console.log(host);



    // console.log('Returning from Config Service');
    return this.data;
  }

}
