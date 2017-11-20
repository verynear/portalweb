import { Component, OnInit } from '@angular/core';
import {StatusService} from '../../services/status.service';
import {Status} from '../../models/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  status: Status;
  error: string;

  constructor(private service: StatusService) { }

  ngOnInit() {
    this.service.getStatus()
      .then((status) => this.status = status)
      .catch(() => this.error = `Failed to access the API. Check console for more info.`);
  }

}
