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
import { AlertService } from './alert.service';
import { SessionService} from '../services/session.service';
import 'rxjs/add/operator/share';


@Injectable()
export class SiteService {
  private url: string;
  private defaultSiteId: Number;
  public user: User;
  public currentSite: Site;

  constructor(private http: HttpClient,
              private config: ConfigService,
              private alertService: AlertService,
              private sessionService: SessionService) {

    this.url = config.get().api.baseURL;
  }

  init() {
    this.setDefaultSite();
  }

  getRentalSites() {
    return this.http.get(`${this.url}/sites/`);
  }

  getRentalSite(id: number) {
    return this.http.get(`${this.url}/sites/${id}`);
  }

  getBuildings(id: number) {
     return this.http.get<Building[]>(`${this.url}/sites/${id}/buildings/`); // - will retrive buildings by site ID //
  }

  getUnitsByBuildingId(id: number) {
     return this.http.get<Unit[]>(`${this.url}/sites/buildings/${id}/units`).toPromise();
  }

  getTenantsByUnitId(id: number) {
     return this.http.get<Tenant[]>(`${this.url}/sites/buildings/units/${id}/residents`);
  }

  setDefaultSite() {
    this.getRentalSites().subscribe((sites: Site[]) => {
      this.currentSite = sites[0]; // If there are no sites.
      const user = this.sessionService.get('currentUser');

      for (const site of sites) {
        if (site.id === user.defaultRentalSiteId) {
          this.currentSite = site;
        }
      }
    });
  }
}
