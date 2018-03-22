import { Component, OnInit, Input, Output, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Inquiry } from '../../../models/inquiry';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-viewreceived',
  templateUrl: './viewreceived.component.html',
  styleUrls: ['./viewreceived.component.scss']
})
export class ViewReceivedComponent implements OnInit {

  id: number;
  inquiry: Inquiry;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute,
    public messageService: MessageService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
          this.id = Number (params.id);
          this.getInquiry(this.id);
    });
  }

  getInquiry(id: number) {
    this.loading = true;
    this.messageService.getInquiry(id).subscribe(
      data => {
        this.loading = false;
        this.inquiry = data;
      },
      error => {
        this.loading = false;
        console.log('Error: getInquiry(): ViewReceived');
      });
  }
}
