import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '../models/message';
import { Building } from '../models/building';
import { Tenant } from '../models/tenant';
import { Unit } from '../models/unit';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from './config.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { SortService } from '../components/sortable-table/sort.service';

@Injectable()
export class MessageService {
  private baseURL: string;
  messages: Array<Message>;
  private _listners = new Subject<any>();
  onSent$ = this._listners.asObservable();

  onSent() {
    this._listners.next();
  }

 constructor(private http: HttpClient, private sortService: SortService, private config: ConfigService) {
   this.baseURL = config.get().api.baseURL;
  }

 get() {
    return this.http.get<Message[]>(this.baseURL + '/messages');
  }

 getSent() {
    return this.http.get<Message[]>(this.baseURL + '/messages?page=0&size=100');
  }

  getSentAnnouncements() {
    return this.http.get<Message[]>(this.baseURL + '/announcements');
  }

  sortMessages (messages, criteria: MessageSearchCriteria): Message[] {
     return messages.sort((a, b) => {
      return this.sortService.sortHelper(a, b, criteria);
    });
  }

  getbuildings(id: number) {
     return this.http.get<Building[]>(this.baseURL + '/sites/' + id + '/buildings/'); // - will retrive buildings by site ID //
  }

  getUnitsByBuildingId(id: number) {
     return this.http.get<Unit[]>(this.baseURL + '/sites/buildings/' + id + '/units')
                    .toPromise();
  }

  getTenantsByUnitId(id: number) {
     return this.http.get<Tenant[]>(this.baseURL + '/sites/buildings/units/' + id + '/residents');
  }

  sendMessage (message: Message) {
    return this.http.post(this.baseURL + '/messages', message);
  }

}

class MessageSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}




