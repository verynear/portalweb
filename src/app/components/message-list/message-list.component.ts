import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Inquiry } from '../../models/inquiry';
import { Router } from '@angular/router';

/*
  Component: Message-List

  Description: Component to display recent messages in dropdown on top of menu.
  Input: @Param maxSize: The number of messages to display in the list.

  Dependencies: Shorten.Pipe, HtmlToPlain.Pipe, NgBootstrap, Bootstrap
*/

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  loading: boolean;
  inquiries: Inquiry[];

  @Input('maxSize') // The number of messages to display in the list.  4 by Default.
  maxSize = 4;

  @Input('previewLength') // The length of the message preview, in characters.  25 by Default.
  previewLength = 25;

  constructor(private router: Router, public messageService: MessageService) { }

  ngOnInit() {
    this.getInquiries(0, this.maxSize);
  }

  getInquiries(page, itemsPerPage) {
    this.loading = true;
    this.messageService.getInquiries(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.inquiries = data['generalInquiries'];
      },
      error => {
        this.loading = false;
      });
  }

  openInquiry(id: number) {
    this.loading = true;
    this.router.navigate(['/messages/inbox', id]);
    console.log('OPEN MESSAGE');
    console.log(id);
  }

}
