import { Injectable } from '@angular/core';
import { Attachment } from '../models/attachment';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadFileService {
  private subject = new Subject<Attachment>();
  private baseURL: string;

  constructor(private http: HttpClient, private config: ConfigService) {
   console.log('attachment service: constructor');
   this.baseURL = config.get().api.baseURL;
  }

  postAttachments(id, attachments) {
    return this.http.post(this.baseURL + '/messages/' + id + '/attachments', attachments);
  }

}
