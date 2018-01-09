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

  sendMessage (message: Message) {
    return this.http.post(this.baseURL + '/message', message)
    .map( (response: Response) => response.json());
  }

}

class MessageSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}


