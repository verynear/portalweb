import { Component, OnInit, NgModule } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { Unit } from '../../models/unit';
import { Building } from '../../models/building';

@Component({
  selector: 'app-manage-units',
  templateUrl: './manage-units.component.html',
  styleUrls: ['./manage-units.component.scss']
})
export class ManageUnitsComponent implements OnInit {

  public currentSite: Site;
  public buildings: Building[];
  public units: Unit[];
  public selectedBuilding: Building;
  public isActive: any[];

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
      this.getBuildings();
    });
  }

  getBuildings() {
    this.siteService.getBuildings(this.currentSite.id).subscribe(
      data => {
        this.buildings = data;
        this.getUnits(data[0]);
      },
      error => {
        console.log('Error: getBuildings: manageUnitComponent');
      });
  }

  selectBuilding($event) {
    if ($event === 'all') { // Show all buildings.
      return; // Temp until we implement API.
    }

    this.getUnits($event);
  }

  getUnits(building) {
    this.siteService.getUnitsByBuildingId(building.id).then(
      data => {
        this.selectedBuilding = building;
        this.units = data;
      },
      error => {
        console.log('Error: getBuildings: manageUnitComponent');
      });
  }

  clearUnitButtons(i) {
    this.units[i]['avail'] = false;
    this.units[i]['notavail'] = false;
    this.units[i]['disable'] = false;
    this.units[i]['reserved'] = false;
    this.units[i]['modelunit'] = false;
    this.units[i]['disable'] = false;
  }

  changeUnitAvail(i, type) {
    this.clearUnitButtons(i);

    if (this.units[i][type] == null) {
      this.units[i][type] = true;
    } else {
      this.units[i][type] = !this.units[i][type];
    }
  }
}
