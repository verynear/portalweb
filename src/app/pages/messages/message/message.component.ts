import { Component, OnInit, Input, Output, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  id: number;
  private sub: any;
  message: any;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public messageService: MessageService) {
    this.route.params.subscribe(params => {
          this.id = Number (params.id);
    });
      this.getMessage(this.id);
  }

  ngOnInit() {
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  getMessage(id) {
    this.messageService.get(id).subscribe(
      data => {
        this.loading = false;
        this.message = data;
        console.log('FETCHED MESSAGE');
        console.log(this.message);
      },
      error => {
        console.log('Error');
      });
  }

}
