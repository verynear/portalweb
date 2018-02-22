/* Alerts can accept an optional link

Simple alert:
this.alertService.error('Message Failed to Send');

Alert with Link:
this.alertService.success('Your message has been sent', this.link, true, false);

*/

import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import { Alert, AlertType } from '../../models/alert';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  alerts: Alert[] = [];
  public alertLink = false;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getAlert().subscribe((alert: Alert) => {
          if (!alert) {
              // clear alerts when an empty alert is received
              this.alerts = [];
              return;
          }

          // add alert to array
          this.alerts.push(alert);
          // show link in alert
          if (alert.alertLink === true ) {
            this.alertLink = true;
          }

          // remove alert after 6 seconds
          setTimeout(() => this.removeAlert(alert), 5500);
      });
  }

  removeAlert(alert: Alert) {
      this.alerts = this.alerts.filter(x => x.message !== alert.message);
      // reset link to false
      this.alertLink = false;
  }

  cssClass(alert: Alert) {
      if (!alert) {
          return;
      }

      // return css class based on alert type
      switch (alert.type) {
          case AlertType.Success:
              return 'alert alert-success';
          case AlertType.Error:
              return 'alert alert-danger';
          case AlertType.Info:
              return 'alert alert-info';
          case AlertType.Warning:
              return 'alert alert-warning';
      }
  }
}
