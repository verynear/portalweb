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
  public activeFilter: string;
  public filters: any[];

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
      this.getBuildings();
    });

    this.initFilters();
    
  }

  initFilters() {
    this.filters = ["View All Status", "Available", "Not Available", "Reserved", "Model"];
  }

  // Temp default.
  default() {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i]['avail'] = true;
    }
  }

  getBuildings() {
    this.siteService.getBuildings(this.currentSite.id).subscribe(
      data => {
        this.buildings = data;
        this.getUnits(data[0]);
      },
      error => {
        console.log('Error: getBuildings: getBuildings');
      });
  }

  selectBuilding($event) {
    this.getUnits($event);
  }

  getUnits(building) {
    this.siteService.getUnitsByBuildingId(building.id).then(
      data => {
        this.selectedBuilding = building;
        this.units = data;
        this.default();
      },
      error => {
        console.log('Error: getBuildings: getUnits');
      });
  }

  filter(filterName) {
    console.log(filterName);
    this.activeFilter = filterName;
  }

  changeUnitAvail(i, type) {
    if (this.units[i][type] == null) {
      this.units[i][type] = true;
    } else {
      this.units[i][type] = !this.units[i][type];
    }
  }
}
