import { Component, OnInit } from '@angular/core';
import { HtmlToPlainPipe } from '../../pipes/html-to-plain.pipe';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-mostrecent',
  templateUrl: './mostrecent.component.html',
  styleUrls: ['./mostrecent.component.scss']
})
export class MostrecentComponent implements OnInit {
  message: Message;
  readPercent: number;
  pendingPercent: number;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.getMostRecent();
  }

  getMostRecent() {
    console.log('getSentMessage: Dashboard');
    this.messageService.getSent(0, 1).subscribe(
      data => {
        this.message = data['messages'][0];
        this.calcPercents(this.message);
      },
      error => {
        console.log('Error: getMostRecent(): Dashboard()');
      });
  }

  calcPercents(message) {
    this.readPercent = (message.readReceipts / message.totalReceipts);
    this.pendingPercent = (message.unreadReceipts / message.totalReceipts);
  }

}
