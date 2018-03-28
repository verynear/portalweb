import { Component, OnInit, Input, Output, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { Attachment } from '../../../models/attachment';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-viewsent',
  templateUrl: './viewsent.component.html',
  styleUrls: ['./viewsent.component.scss']
})
export class ViewSentComponent implements OnInit {
  id: number;
  message: Message;
  loading: boolean;
  attachments: Attachment;

  constructor(private router: Router, private route: ActivatedRoute,
    public messageService: MessageService, private alertService: AlertService) {
    this.route.params.subscribe(params => {
          this.id = Number (params.id);
    });
      this.getMessage(this.id);
      this.getMessageAttachment(this.id);
  }

  ngOnInit() {
  }

  getMessage(id: number) {
    this.loading = true;
    this.messageService.get(id).subscribe(
      data => {
        console.log('The Message Is');
        console.log(data);
        this.loading = false;
        this.message = data;
      },
      error => {
        this.loading = false;
        console.log('Error: getMessage()');
      });
  }

  getMessageAttachment(id: number) {
    this.loading = true;
    this.messageService.getMessageAttachements(id).subscribe(
      data => {
        this.loading = false;
        this.attachments = data;
      },
      error => {
        this.loading = false;
        console.log('Error: getMessageAttachment()');
      });
  }

}
