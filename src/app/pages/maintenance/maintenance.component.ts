import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  constructor(public maintenanceService: MaintenanceService) { }

  ngOnInit() {
  }

}
