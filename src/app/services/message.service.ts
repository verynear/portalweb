import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '../models/message';
import { Inquiry } from '../models/inquiry';
import { Building } from '../models/building';
import { Tenant } from '../models/tenant';
import { Unit } from '../models/unit';
import { Attachment } from '../models/attachment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from './config.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { SortService } from '../components/sortable-table/sort.service';

@Injectable()
export class MessageService {
  private baseURL: string;
  messages: Array<Message>;
  private _listeners = new Subject<any>();
  onSent$ = this._listeners.asObservable();
  onRefresh$ = this._listeners.asObservable();

  onSent() {
    this._listeners.next();
  }

  onRefresh() {
    this._listeners.next();
  }

 constructor(private http: HttpClient, private sortService: SortService, private config: ConfigService) {
   console.log('message service: constructor');
   this.baseURL = config.get().api.baseURL;
  }

  get(id) {
    return this.http.get<Message>(this.baseURL + '/messages/' + id);
  }

  getInquiry(id) {
    return this.http.get<Inquiry>(this.baseURL + '/inquiry/' + id);
  }

  getSent(page, size) {
    return this.http.get<Message[]>(this.baseURL + '/messages?page=' + page + '&size=' + size);
  }

  getInquiries(page, size) {
    return this.http.get<Inquiry[]>(this.baseURL + '/inquiry?page=' + page + '&size=' + size);
  }

  getSentAnnouncements() {
    return this.http.get<Message[]>(this.baseURL + '/announcements');
  }

  getMessageAttachements(id: number) {
    return this.http.get<Attachment>(this.baseURL + '/messages/' + id + '/attachments');

  }

  sendMessage (message: Message) {
    return this.http.post(this.baseURL + '/messages', message);
  }

  sortMessages (messages, criteria: MessageSearchCriteria): Message[] {
     return messages.sort((a, b) => {
      return this.sortService.sortHelper(a, b, criteria);
    });
  }

  sortInquiries (inquiries, criteria: MessageSearchCriteria): Inquiry[] {
     return inquiries.sort((a, b) => {
      return this.sortService.sortHelper(a, b, criteria);
    });
  }
}

class MessageSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}




