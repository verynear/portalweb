import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Applicant, ApplicantTest } from '../models/applicant';
import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';
import { ConfigService } from './config.service';
import { SortService } from '../components/sortable-table/sort.service';



@Injectable()
export class ApplicantService {
    private baseURL: string;
    applicants: Array<ApplicantTest>;

    // applicant = this.applicant;

    constructor(private http: HttpClient,
                private config: ConfigService, private sortService: SortService ) {
    this.baseURL = config.get().api.baseURL;
      }

    get() {
    return this.http.get<any>('https://client.betternoi.com/rest/betterAPI/requests?propertyid=078ACAFB-E876-4CC7-9B66-3AF43398B8C8');
      }

    getTestData() {
    return this.http.get<any>('assets/applicant-test.json')
          .toPromise()
          .then(res => <Applicant[]>res.data)
          .then(data => data );
    }

    create(applicant: Applicant) {
    return this.http.post(this.baseURL + '/tenant/', applicant);
      }

    approve(id: number) {
      return this.http.put(this.baseURL + '/applicants/approve/' + id, id);
      }

    sortApplicants (applicants, criteria: MessageSearchCriteria): ApplicantTest[] {
       return applicants.sort((a, b) => {
        return this.sortService.sortHelper(a, b, criteria);
      });
    }
 }

 class MessageSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
