import { Component, OnInit, Input, Output, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Inquiry } from '../../../models/inquiry';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

  id: number;
  private sub: any;
  inquiry: any;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public messageService: MessageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
          this.id = Number (params.inq);
    });
      this.getInquiry(this.id);
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
        console.log('Error');
      });
  }

}
