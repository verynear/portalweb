import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {RentalSite} from '../models/rental-site';

@Injectable()
export class RentalService {
  private url: string;
  private subdomain: string;
  private host: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {

    this.url = config.get().api.baseURL;
    this.subdomain = config.get().customer.subdomain;
    this.host = config.get().customer.host;
  }

  getBrandingCssUrl(): string {
    return `${this.url}/company/branding/css?domain=${this.subdomain}`;
  }

  getBrandingData(): Promise<RentalSite> {
    return this.http.get<RentalSite>(`${this.url}/company/branding/data?domain=${this.subdomain}`)
      .toPromise();
  }

  checkSubdomain(): Promise<boolean> {
    if (!this.config.get().environments.includes(this.host)) {
      return Promise.resolve(false);
    }

    return this.http.get(`${this.url}/rental/company/validate?domain=${this.subdomain}`)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

}
