import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {RentalSite} from '../models/rental-site';

@Injectable()
export class RentalService {
  private url: string;
  private subdomain: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {

    this.url = config.get().api.baseURL;
    this.subdomain = config.get().customer.subdomain;
  }

  getBrandingCssUrl(): string {
    return `${this.url}/rental/branding/css?domain=${this.subdomain}`;
  }

  getBrandingData(): Promise<RentalSite> {
    return this.http.get<RentalSite>(`${this.url}/rental/company/validate?domain=${this.subdomain}`)
      .toPromise();
  }

  checkSubdomain(): Promise<boolean> {
    if (this.config.get().environments.includes(this.subdomain)) {
      return Promise.resolve(false);
    }

    return this.getBrandingData()
      .then(() => true)
      .catch(() => false);
  }

}
