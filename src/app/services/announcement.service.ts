import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';

@Injectable()
export class AnnouncementService {
  private baseURL: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseURL = config.get().api.baseURL;
  }

  getSentAnnouncements() {
    return this.http.get<Announcement[]>(this.baseURL + '/announcements');
  }

  postAnnouncement(announcement: Announcement) {
    return this.http.post(this.baseURL + '/announcements', announcement);
  }

  deleteAnnouncement(id: number): Observable<Announcement> {
    return this.http.delete(this.baseURL + '/announcements/' + id)
      .map((res:Response) => {
        res.json()
      }).catch((error:any) => { 
        return Observable.throw(this.errorHandler(error))
      }); 
  }

  errorHandler(error: any): void {
    console.log("Error: AnnouncementService");
    console.log(error)
  }
}
