import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AnnouncementService {
  private baseURL: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseURL = config.get().api.baseURL;
  }

  getSentAnnouncements(page, size): Observable<Announcement> {
    return this.http.get<Announcement[]>(this.baseURL + '/announcements?page=' + page + '&size=' + size)
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  postAnnouncement(announcement: Announcement) {
    return this.http.post(this.baseURL + '/announcements', announcement)
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  deleteAnnouncement(id: number): Observable<Announcement> {
    return this.http.delete(this.baseURL + '/announcements/' + id)
    .catch((error: any) => Observable.throw(error));
  }

  errorHandler(error: any): void {
    console.log('Error: AnnouncementService');
    console.log(error);
  }
}
