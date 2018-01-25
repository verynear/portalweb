import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AnnouncementService {
  private baseURL = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  getSentAnnouncements() {
    return this.http.get<Announcement[]>(this.baseURL + '/announcements');
  }

  postAnnouncement (announcement: Announcement) {
    return this.http.post(this.baseURL + '/announcements', announcement);
  }

}
