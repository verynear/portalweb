import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { SortService } from '../components/sortable-table/sort.service';

import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
  private baseURL = environment.api.baseUrl;
  messages: Array<Message>;

 constructor(private http: HttpClient, private sortService: SortService) {
  }

 get() {
    return this.http.get<Message[]>(this.baseURL + '/message');
  }

 getSent() {
    return this.http.get<Message[]>(this.baseURL + '/message');
  }

  sortMessages (messages, criteria: MessageSearchCriteria): Message[] {
     return messages.sort((a, b) => {
      return this.sortService.sortHelper(a, b, criteria);
    });
  }

  getbuildings(id: number) {
     return this.http.get<Building[]>(this.baseURL + '/site/' + id); // - will retrive buildings by site ID //
  }

  getUnitsByBuildingId(id: number) {
     return this.http.get<Unit[]>(this.baseURL + '/site/building' + id);
  }

  sendMessage (message: Message) {
    return this.http.post(this.baseURL + '/message', message);
  }

}

class MessageSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}

class Building {
  id: number;
  address1: string;
  buildingId: number;
  buildingNumber: number;
}

class Unit {
  unitId: number;
  unitNumber: number;
}


