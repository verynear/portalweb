import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Applicant } from '../models/applicant';
import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';
import { ConfigService } from './config.service';



@Injectable()
export class ApplicantService {
    private baseURL: string;

    applicant = this.applicant;

    constructor(private http: HttpClient,
                private config: ConfigService ) {
    this.baseURL = config.get().api.baseURL;
      }

    get() {
    return this.http.get<Applicant[]>(this.baseURL + '/applicants');
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
 }
