import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Applicant } from '../models/applicant';
import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';



@Injectable()
export class ApplicantService {
    private baseURL = environment.api.baseUrl;

    constructor(private http: HttpClient) { }

    getApplicants() {
    return this.http.get<any>(this.baseURL + '/applicants')
      .toPromise()
      .then(res => <Applicant[]>res.data)
      .then(data => data);
    }
}
