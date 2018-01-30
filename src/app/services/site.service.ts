import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site';
import { Building } from '../models/building';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Unit } from '../models/unit';
import { Tenant } from '../models/tenant';
import { ConfigService } from './config.service';
import { LoginService } from './login.service';
import { AlertService } from './alert.service';


@Injectable()
export class SiteService {
  currentSiteId: number;
  public defaultSite = 0; // until default site attribute and user edit
  private currentSite: Site;
  private userSites: any;
  private url: string;
  private _listners = new Subject<any>();
  onSwitch$ = this._listners.asObservable();

  onSwitch() {
    this._listners.next();
  }

  constructor(private http: HttpClient,
              private config: ConfigService,
              private loginService: LoginService,
              private alertService: AlertService) {

    this.url = config.get().api.baseURL;
    this.loginService.getCurrentUser()
      .then((user: User) => {
        this.getRentalSites(user)
        .subscribe(
            data => {
                this.userSites = data;
                if (this.currentSite) {
                  this.setCurrentSite(this.currentSite);
                } else {
                  this.currentSite = this.userSites[this.defaultSite];
                  this.setCurrentSite(this.currentSite);
                }
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });

        return user;
         });
  }

  // getRentalSite(id: number): Promise<Site> {
  //   return this.http.get<Site>(`${this.url}/sites/${id}`)
  //     .toPromise();
  // }

  getRentalSite(id: number) {
    return this.http.get(`${this.url}/sites/${id}`);
  }

  getRentalSites(user: User) {
    return this.http.get(`${this.url}/sites/`);
  }

  getbuildings(id: number) {
     return this.http.get<Building[]>(`${this.url}/sites/${id}/buildings/`); // - will retrive buildings by site ID //
  }

  getUnitsByBuildingId(id: number) {
     return this.http.get<Unit[]>(`${this.url}/sites/buildings/${id}/units`)
                    .toPromise();
  }

  getTenantsByUnitId(id: number) {
     return this.http.get<Tenant[]>(`${this.url}/sites/buildings/units/${id}/residents`);
  }

  getCurrentSite() {
    return this.currentSite;
  }

  setCurrentSite(site: Site) {
    this.currentSite = site;
  }

  getUserSites() {
    return this.userSites;
  }

}
