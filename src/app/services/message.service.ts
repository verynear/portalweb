import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';

@Injectable()
export class MessageService {
  private baseURL = environment.api.baseUrl;

 constructor(private http: HttpClient) {
  }

 get() {
    return this.http.get<Message[]>(this.baseURL + '/message');
  }

 // clear() {
  //   this.messages = [];
  // }

 // add(message: string) {
  //   this.messages.push(message);
  // }

}
