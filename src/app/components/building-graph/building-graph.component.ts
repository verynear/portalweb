import { Component, OnInit, Input } from '@angular/core';

/*
  HOW TO USE:

  Create with a valid readPercent (0 - 100) .. and, boom!
*/

@Component({
  selector: 'app-building-graph',
  templateUrl: './building-graph.component.html',
  styleUrls: ['./building-graph.component.scss']
})
export class BuildingGraphComponent implements OnInit {
  pendingPercent: number;
  buildingImgSrc: string;
  buildingImgPath = './assets/building-graphs/';

  @Input() readPercent: number; // The percentage of buildings where the message has been read, Valid Input is: 0 - 100

  constructor() { }

  ngOnInit() {
    this.buildingImgSrc = './assets/building-graphs/building-0.png';
    this.pendingPercent = 100 - this.readPercent;
    this.convertToPercent();
  }

  convertToPercent() {
    this.readPercent = (this.readPercent / 100);
    this.pendingPercent = (this.pendingPercent / 100);
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
