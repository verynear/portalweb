import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SiteService } from '../../../services/site.service';
import { MessageService } from '../../../services/message.service';
import { ReportService } from '../../../services/report.service';
import { AlertService } from '../../../services/alert.service';

import { User } from '../../../models/user';
import { Site } from '../../../models/site';
import { Building } from '../../../models/building';
import { Message } from '../../../models/message';
import { Report } from '../../../models/report';
import { Attachment } from '../../../models/attachment';
import { Receipt } from '../../../models/receipt';

@Component({
  selector: 'app-report',
  templateUrl: './message-report.component.html',
  styleUrls: ['./message-report.component.scss']
})
export class MessageReportComponent implements OnInit {
  public currentSite: Site;
  public messages: Message[];
  public message: Message;
  public report: Receipt;

  public id: number;
  public reportExists: boolean;
  public loading: boolean;

  constructor(private siteService: SiteService, private messageService: MessageService,
    private router: Router, private route: ActivatedRoute, private alertService: AlertService, private reportService: ReportService) {

      this.route.params.subscribe(params => {
       this.id = params.id;
      });

  }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;

      this.getMessageReport(this.id);
      this.getMessage(this.id);
    });
  }

  getMessage(id) {
    this.loading = true;
    this.messageService.get(id).subscribe(
      data => {
        this.loading = false;
        this.message = data;
      },
      error => {
        this.loading = false;
      });
  }

  getMessageReport(id) {
    this.loading = true;
    this.reportService.messageReport(id).subscribe(
      data => {
        this.loading = false;
        this.reportExists = true;
        this.report = data;
        this.testData();  // TEST DATA FOR TESTING.
        console.log('Report');
        console.log(this.report);
      },
      error => {
        this.loading = false;
      });
  }

  goToCommunityReport() {
    this.router.navigate(['/report/community-report', this.currentSite.id]);
  }

  testData() {
      console.log('Hi');
      const message = this.report.messageRecipients;

      message[0].attachment = new Array();
      message[0].attachment[0] = new Attachment();
      message[0].attachment[1] = new Attachment();
      message[0].attachment[2] = new Attachment();

      message[0].attachment[0].fileName = 'myNewAwesomeFile.png';
      message[0].attachment[0].url = 'http://www.google.com/';
      message[0].attachment[0].createDate = '3/19/18, 1:02 PM';
      message[0].attachment[0].updateDate = '3/19/18, 1:02 PM';

      message[0].attachment[1].fileName = 'someOtherFile.png';
      message[0].attachment[1].url = 'http://www.google.com/';
      message[0].attachment[1].createDate = '3/19/18, 1:02 PM';
      message[0].attachment[1].updateDate = '3/19/18, 1:02 PM';

      message[0].attachment[2].fileName = 'andAnotherFile.png';
      message[0].attachment[2].url = 'http://www.google.com/';
      message[0].attachment[2].createDate = '3/19/18, 1:02 PM';
      message[0].attachment[2].updateDate = '3/19/18, 1:02 PM';
  }
}


