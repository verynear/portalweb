import { Component, OnInit, Input } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  public activities: any = [];
  loading: boolean;

  // The number of activities from each category to display
  @Input('pageSize')
  pageSize = 10; // Display 10 activities from each category by default.

  @Input('maxSize') // The size (length) of each message before linking to the page of the message.
  maxSize = 1000;

  constructor(public activityService: ActivityService) { }

  ngOnInit() {
    this.getRecentActivity();
  }

  getRecentActivity() {
    this.loading = true;
    this.activityService.get().subscribe(
      data => {
        this.loading = false;
        this.activities = data;
      },
      error => {
        this.loading = false;
        console.log('Error: getRecentActivity: ActivityComponent');
      });
  }


}
