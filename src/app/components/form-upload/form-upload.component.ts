import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../services/message.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../services/alert.service';
import { FileUploadModule } from 'primeng/primeng';
import { FileUpload } from 'primeng/components/fileupload/fileupload';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';


@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  @ViewChild(FileUpload) pFileUpload: FileUpload;
  FOLDER = 'noi-s3/';
  msg: string;
  dataLocation: string;
  uploadReady = false;
  currentUpload = false;

  attachments: any[] = [];
  uploadedFiles: any[] = [];

  constructor(private uploadService: UploadFileService, private messageService: MessageService,
    private alertService: AlertService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.uploadedFiles = [];
  }

  pushAttachments(attachArray) {
    attachArray.forEach((m) => {
      const values = Object.keys(m).map(key => m[key]);
      this.messageService.loadAttachment(values[0], values[1], values[2], values[3]);
    });
  }

  formatSize(bytes) {
      if (bytes === 0) {
          return '0 B';
      }
      const k = 1000,
      dm = 1,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  remove(index) {
      this.uploadedFiles.splice(index, 1);
  }

  onUpload(event) {
    this.attachments = [];
    this.uploadReady = false;
    this.currentUpload = true;
    const self = this;
    const bucket = new S3(
      {
        accessKeyId: 'AKIAI6JR7BFD4VQVVDKA',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    for (const file of event.files) {
          file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
          file.isImage = /^image\//.test(file.type);
          this.uploadedFiles.push(file);
          const params = {
            Bucket: 'noi-angular5-bucket',
            Key: this.FOLDER + file.name,
            Body: file
          };
          const putObjectPromise = bucket.upload(params).promise();
          putObjectPromise.then(function(data) {
            // self.messageService.loadAttachment(url: self.dataLocation, fileName: file.name, fileSizeKB: file.size, fileType: file.type);
            self.dataLocation = data.Location;
            console.log('Successfully uploaded file.', data);
          }).catch(function(err) {
            console.log('There was an error uploading your file: ', err);
          });
          setTimeout(() => {
              const newAttachment = { url: self.dataLocation, fileName: file.name, fileSizeKB: file.size, fileType: 'pdf' };
              this.attachments.push(newAttachment);
              }, 3500);
      }
    setTimeout(() => {
        console.log('this attachments');
        console.log(this.attachments);
        this.pushAttachments(this.attachments);
        this.uploadReady = true;
        this.currentUpload = false;
        }, 5000);

    this.pFileUpload.files = [];
  }
}
