import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {RentalSite} from '../models/rental-site';
import {Observable} from 'rxjs/Observable';

/*
  This service is responsible for handling branding & themes at a Rental Site (Community) level.
*/ 

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

  getBrandingData(): Observable<RentalSite> {
      return this.http.get<RentalSite>(`${this.url}/company/branding/data?domain=${this.subdomain}`)
      .catch((error: any) => {
        return Observable.throw(this.errorHandler(error));
      });

  }

  // TODO: Return Observable, not Promise.
  checkSubdomain(): Promise<boolean> {
    if (!this.config.get().environments.includes(this.host)) {
      return Promise.resolve(false);
    }

    return this.http.get(`${this.url}/rental/company/validate?domain=${this.subdomain}`)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  errorHandler(error: any): void {
    console.log('Error: RentalService');
    console.log(error);
  }

}
