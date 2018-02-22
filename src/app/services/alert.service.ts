/* Alerts can accept an optional link

Simple alert:
this.alertService.error('Message Failed to Send');

Alert with Link:
this.alertService.success('Your message has been sent', this.link, true, false);

*/

import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType } from '../models/alert';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, link?: string, alertLink = false, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, link, alertLink, keepAfterRouteChange);
    }

    error(message: string, link?: string, alertLink = false, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, link, alertLink, keepAfterRouteChange);
    }

    info(message: string, link?: string, alertLink = false, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, link, alertLink, keepAfterRouteChange);
    }

    warn(message: string, link?: string, alertLink = false, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, link, alertLink, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, link?: string, alertLink = false, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ type: type, message: message, link: link, alertLink });
    }

    clear() {
        // clear alerts
        this.subject.next();
    }
}
