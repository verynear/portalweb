import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Applicant } from '../models/applicant';
import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';



@Injectable()
export class ApplicantService {
    private baseURL = environment.api.baseUrl;

    applicant = this.applicant;

    constructor(private http: HttpClient) { }

    get() {
    return this.http.get<Applicant[]>(this.baseURL + '/applicants');
      }

    create(applicant: Applicant) {
    return this.http.post(this.baseURL + '/tenant/', applicant);
      }

    approve(id: number) {
      return this.http.put(this.baseURL + '/applicants/approve/' + id, id);
      }
 }
