import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages = [];

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messageService.get().subscribe(
      data => {
        console.log("You've received messages");
        console.log(data);
        this.messages = data;
        console.log(data[0].subject);
      },
      error => {
        console.log("Error");
      });
  }

  makeFavorite(message) {
    message.favorite = !message.favorite;
    // TODO: Implement a POST for sustaining favorites on back-end.
  } 

  openMessage(id) {
    console.log("You've Opened" + id);
    // TODO: Create a new component for reading messages.
  }

}
