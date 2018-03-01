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
  private sub: any;
  inquiry: any;
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

  // ngOnDestroy() {
  //   this.route.unsubscribe();
  // }

  getInquiry(id) {
    this.messageService.getInquiry(id).subscribe(
      data => {
        this.loading = false;
        this.inquiry = data;
        console.log('FETCHED INQUIRY');
        console.log(this.inquiry);
      },
      error => {
        this.loading = false;
        this.alertService.error('Unable to retrieve inquiry');
      });
  }

}
