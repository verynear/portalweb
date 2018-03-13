import { Component, OnInit } from '@angular/core';
import { HtmlToPlainPipe } from '../../pipes/html-to-plain.pipe';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrecent',
  templateUrl: './mostrecent.component.html',
  styleUrls: ['./mostrecent.component.scss']
})
export class MostRecentComponent implements OnInit {
  message: Message;
  readPercent: number;
  pendingPercent: number;

  constructor(public messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMostRecent();
  }

  getMostRecent() {
    this.messageService.getSent(0, 1).subscribe(
      data => {
        this.message = data['messages'][0];
        this.calcPercents(this.message);
      },
      error => {
        console.log('Error: getMostRecent(): MostRecent()');
      });
  }

  openReport() {
    console.log('The message is: ');
    console.log(this.message);
    this.router.navigate(['/report/message-report', this.message.id]);


  }

  calcPercents(message: Message) {
    this.readPercent = (message.readReceipts / message.totalReceipts);
    this.pendingPercent = (message.unreadReceipts / message.totalReceipts);
  }

}
