import { Injectable } from '@angular/core';
import { ReportService } from '../../../services/report.service';
/*
  Helper Class for Report Components

  **Routing**
    OpenCommunityReport
      @Param: communityId

    OpenMessageReport
      @Param: messageId

    OpenUnitReport
      @Param: unitId

    OpenBuildingReport
      @Param: buildingId
*/

@Injectable()
export class ReportHelpersService {

  constructor(private reportService: ReportService) { }

  openCommunityReport() {
    this.router.navigate(['/report/community-report', this.currentSite.id]);
  }

  openUnitReport(unitId: number) {
    this.router.navigate(['/report/unit-report', unitId]);
  }

  openMessageReport(messageId: number) {
    this.router.navigate(['/report/message-report', messageId]);
  }

  openResidentReport(residentId: number) {
    this.router.navigate(['/report/resident-report', residentId]);
  }  

}
