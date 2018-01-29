import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site';
import { ConfigService } from './config.service';

@Injectable()
export class SiteService {
  private url: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {

    this.url = config.get().api.baseURL;
  }

  getRentalSite(id: number): Promise<Site> {
    return this.http.get<Site>(`${this.url}/sites/${id}`)
      .toPromise();
  }

}
