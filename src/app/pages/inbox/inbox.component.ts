import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  messages = [];

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messageService.get().subscribe(
      data => {
        console.log('Youve received messages');
        this.messages = data;
        console.log(data[0].subject);
      },
      error => {
        console.log('Error');
      });
  }

  makeFavorite(message) {
    message.favorite = !message.favorite;
    // TODO: Implement a POST for sustaining favorites on back-end.
  }

  openMessage(id) {
    console.log('Youve Opened' + id);
    // TODO: Create a new component for reading messages.
  }

}
