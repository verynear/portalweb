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
    this.buildingImgSrc = './assets/building-graphs/building-0.png';
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
    if (readPercent === 0) {
      return this.buildingImgPath + 'building-0.png';

    } else if (readPercent < .1 && readPercent > 0) {
      return this.buildingImgPath + 'building-5.png';

    } else if (readPercent < .15 && readPercent >= .1 ) {
      return this.buildingImgPath + 'building-10.png';

    } else if (readPercent < .20 && readPercent >= .15 ) {
      return this.buildingImgPath + 'building-15.png';

    } else if (readPercent < .25 && readPercent >= .20) {
      return this.buildingImgPath + 'building-20.png';

    } else if (readPercent < .30 && readPercent >= .25) {
      return this.buildingImgPath + 'building-25.png';

    } else if (readPercent < .35 && readPercent >= .30) {
      return this.buildingImgPath + 'building-30.png';

    } else if (readPercent < .40 && readPercent >= .35) {
      return this.buildingImgPath + 'building-35.png';

    } else if (readPercent < .45 && readPercent >= .40) {
      return this.buildingImgPath + 'building-40.png';

    } else if (readPercent < .50 && readPercent >= .45) {
      return this.buildingImgPath + 'building-45.png';

    } else if (readPercent < .55 && readPercent >= .50) {
      return this.buildingImgPath + 'building-50.png';

    } else if (readPercent < .60 && readPercent >= .55) {
      return this.buildingImgPath + 'building-55.png';

    } else if (readPercent < .65 && readPercent >= .60) {
      return this.buildingImgPath + 'building-60.png';

    } else if (readPercent < .70 && readPercent >= .65) {
      return this.buildingImgPath + 'building-65.png';

    } else if (readPercent < .75 && readPercent >= .70) {
      return this.buildingImgPath + 'building-70.png';

    } else if (readPercent < .80 && readPercent >= .75) {
      return this.buildingImgPath + 'building-75.png';

    } else if (readPercent < .85 && readPercent >= .80) {
      return this.buildingImgPath + 'building-80.png';

    } else if (readPercent < .90 && readPercent >= .85) {
      return this.buildingImgPath + 'building-85.png';

    } else if (readPercent < .95 && readPercent >= .90) {
      return this.buildingImgPath + 'building-90.png';

    } else if (readPercent < 1.0 && readPercent >= .95) {
      return this.buildingImgPath + 'building-95.png';

    } else if (readPercent === 1.0) {
      return this.buildingImgPath + 'building-100.png';
    }
  }
}
