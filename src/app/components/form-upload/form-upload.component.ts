import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../services/message.service';
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
  public filesDone = false;

  attachments: any[] = [];
  uploadedFiles: any[] = [];

  constructor(private uploadService: UploadFileService, private messageService: MessageService, private alertService: AlertService) { }

  ngOnInit() {
    this.filesDone = false;
  }

  pushAttachments(attachArray) {
    attachArray.forEach((m) => {
      const values = Object.keys(m).map(key => m[key]);
      this.messageService.loadAttachment(values[0], values[1], values[2], values[3]);
    });
  }

  onUpload(event) {
    const self = this;
    const bucket = new S3(
      {
        accessKeyId: 'AKIAI6JR7BFD4VQVVDKA',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    for (const file of event.files) {
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
        }, 5000);

    this.pFileUpload.files = [];
    this.uploadedFiles = [];
    this.filesDone = true;
  }
}
