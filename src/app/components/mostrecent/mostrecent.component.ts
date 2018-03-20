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
  buildingImgSrc: string;
  buildingImgPath = './assets/building-graphs/';

  constructor(public messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMostRecent();
  }

  getMostRecent() {
    this.messageService.getSent(0, 1).subscribe(
      data => {
        this.message = data['messages'][0];
        console.log('MESSAGE');
        console.log(this.message);
        this.calcPercents(this.message);
      },
      error => {
        console.log('Error: getMostRecent(): MostRecent()');
        this.readPercent = 0;
        this.pendingPercent = 1;
      });
  }

  openReport() {
    this.router.navigate(['/report/message-report', this.message.id]);
  }

  calcPercents(message: Message) {
    this.readPercent = (message.readReceipts / message.totalReceipts);
    this.pendingPercent = (message.unreadReceipts / message.totalReceipts);
    this.buildingImgSrc = this.getBuildingImage(this.readPercent);
  }

  getBuildingImage(readPercent) {
    if (readPercent <= .20) {
      return this.buildingImgPath + 'building-0.png';

    } else if (readPercent <= .40 && readPercent > .20) {
      return this.buildingImgPath + 'building-25.png';

    } else if (readPercent <= .60 && readPercent > .40)  {
      return this.buildingImgPath + 'building-50.png';

    } else if (readPercent <= .80 && readPercent > .60) {
      return this.buildingImgPath + 'building-75.png';

    } else if (readPercent <= .100) {
      return this.buildingImgPath + 'building-100.png';
    }
  }
}
