import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class SiteService {
  private url: string;
  private _listners = new Subject<any>();
  onSwitch$ = this._listners.asObservable();

  onSwitch() {
    this._listners.next();
  }

  constructor(private http: HttpClient,
              private config: ConfigService) {

    this.url = config.get().api.baseURL;
  }

  // getRentalSite(id: number): Promise<Site> {
  //   return this.http.get<Site>(`${this.url}/sites/${id}`)
  //     .toPromise();
  // }

  getRentalSite(id: number) {
    return this.http.get(`${this.url}/sites/${id}`);
  }

}
