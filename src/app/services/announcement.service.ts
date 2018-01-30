import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class AnnouncementService {
  private baseURL: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {
        this.baseURL = config.get().api.baseURL;
  }

  getSentAnnouncements() {
    return this.http.get<Announcement[]>(this.baseURL + '/announcements');
  }

  postAnnouncement (announcement: Announcement) {
    return this.http.post(this.baseURL + '/announcements', announcement);
  }

}
