import { Component, OnInit, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { Observable } from 'rxjs/Observable';
import { Attachment } from '../../models/attachment';
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
  @Output() uploadForm = new EventEmitter();
  @Output() removeFile = new EventEmitter();

  FOLDER = 'noi-s3/';
  msg: string;
  dataLocation: string;
  uploadReady = false;
  currentUpload = false;
  removedFileName: string;
  removedFileSize: number;
  attachments: any[] = [];
  uploadedFiles: any[] = [];

  constructor(private uploadService: UploadFileService,
    private alertService: AlertService, private sanitizer: DomSanitizer, private zone: NgZone ) { }

  ngOnInit() {
    this.uploadedFiles = [];
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
      this.removedFileName = this.uploadedFiles[index].name;
      this.removedFileSize = (this.uploadedFiles[index].size / 1000);
      this.uploadedFiles.splice(index, 1);
      if (this.uploadedFiles.length === 0) {
        this.uploadReady = false;
      }
      this.removeFile.emit({name: this.removedFileName, size: this.removedFileSize});
  }

  onUpload(event) {
      const attachments = [];
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
              self.dataLocation = data.Location;
              console.log('Successfully uploaded file.', data);
              const url = self.dataLocation;
              const fileName = file.name;
              const fileSizeKB = (file.size / 1000);
              const fileType = (/\/(.*)/).exec(file.type)[1];
              const newAttachment = { url, fileName, fileSizeKB, fileType };
              self.zone.run(() => {
                    self.uploadForm.emit(newAttachment);
                    self.uploadReady = true;
                    self.currentUpload = false;
              });
            }).catch(function(err) {
              console.log('There was an error uploading your file: ', err);
            });
        }

      this.pFileUpload.files = [];
    }
}
