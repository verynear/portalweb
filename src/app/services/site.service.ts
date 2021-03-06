import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Unit } from '../models/unit';
import { Tenant } from '../models/tenant';
import { Site, SiteBranding } from '../models/site';
import { Building } from '../models/building';

import { ConfigService } from './config.service';
import { AlertService } from './alert.service';
import { SessionService} from '../services/session.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  This service is responsible for handling branding & themes at a Site (Community) Level.
*/

@Injectable()
export class SiteService {
  private url: string;
  private subdomain: string;
  private host: string;
  private currentSite: BehaviorSubject<Site>;

  constructor(private http: HttpClient,
              private config: ConfigService,
              private alertService: AlertService,
              private sessionService: SessionService) {


    this.currentSite = new BehaviorSubject<Site>(new Site);

    this.url = config.get().api.baseURL;
    this.subdomain = config.get().customer.subdomain;
    this.host = config.get().customer.host;
  }

  init() {
    this.setDefaultSite();
  }

  getRentalSites(): Observable<Site[]> {
    return this.http.get(`${this.url}/sites/`)
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  getBuildings(id: number): Observable<Building[]> {
     return this.http.get<Building[]>(`${this.url}/sites/${id}/buildings/`)
     .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  getRentalSite(id: number): Observable<Site> {
    return this.http.get(`${this.url}/sites/${id}`)
    .catch((error: any) => {
     return Observable.throw(this.errorHandler(error));
   });
  }

  getUnitsByBuildingId(id: number) {
     return this.http.get<Unit[]>(`${this.url}/sites/buildings/${id}/units`).toPromise();
  }

  getTenantsByUnitId(id: number) {
     return this.http.get<Tenant[]>(`${this.url}/sites/buildings/units/${id}/residents`);
  }

  setCurrentSite(site: Site) {
    this.currentSite.next(site);
    this.setTheme(site);  // Set current theme.
  }

  getCurrentSite(): Observable<Site> {
    return this.currentSite.asObservable();
  }

  // Returns the Branding for a Site (Community).
  getSiteBranding(): Observable<SiteBranding> {
    return this.http.get<Building[]>(`${this.url}/rental/branding/data?domain=${this.subdomain}`)
    .catch((error: any) => {
     return Observable.throw(this.errorHandler(error));
   });
  }

  setDefaultSite() {
    this.getRentalSites().subscribe((sites: Site[]) => {
      const user = this.sessionService.get('currentUser');

      for (const site of sites) {
        if (site.id === user.defaultRentalSiteId) {
          this.currentSite.next(site); // Set Default Site by User Specification.
        } else {
          this.currentSite.next(sites[0]); // Default Site is at 0th index.

        }
      }
    });
  }

  // To be revised.
  setTheme(site) {
    if (site == null) {
      return null;
    }

    const primary = site.rentalSitesBrandings[0].bgColor;

    const str = '.btn-primary {background-color: ' + primary + ' !important} ' +
    '.primary.active {background-color: ' + primary + ' !important}' +
    '.primary:hover {background-color: ' + primary + ' !important}' +
    'h1 {color: ' + primary + ' !important}' +
    'a.btn.btn-default.active {background-color: ' + primary + ' !important}' +
    '.ui-fileupload-choose {background-color: ' + primary + ' !important}';

    const node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
  }

  errorHandler(error: any): void {
    console.log('Error: SiteService');
    console.log(error);
  }

}



