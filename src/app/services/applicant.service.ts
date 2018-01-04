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
    return this.http.get<Applicant[]>(this.baseURL + '/tenant');
      }

    approve(applicant: Applicant) {
      return this.http.put(this.baseURL + '/approveTenant/' + applicant.id, applicant).subscribe(
      data => {
        console.log('Youve converted applicant');
        this.applicant = data;
        console.log(data[0].subject);
      },
      error => {
        console.log('Error');
      });
      }
 }
