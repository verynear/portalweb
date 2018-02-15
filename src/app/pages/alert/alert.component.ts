import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {
    message: any;
    type: any;
    closed1 = false;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => this.message = message,
        	type => this.type = type);
        // setTimeout(() => this.closed1 = true, 20000);
        console.log(this.message);
        console.log(this.type);
    }
}
