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
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  @ViewChild(FileUpload) pFileUpload: FileUpload;
  @Output() uploadForm = new EventEmitter();
  @Output() removeFile = new EventEmitter();

  s3: any;
  msg: string;
  dataLocation: string;
  uploadReady = false;
  currentUpload = false;
  nameError = false;
  sizeError = false;
  removedFileName: string;
  removedFileSize: number;
  totalAttachSize = 0;
  uploadedFiles: any[] = [];
  fileNameTooLongMessageSummary = '{0}: Attachment file name too long, ';
  fileNameTooLongMessageDetail = 'maxumum length: 46 charachters';
  filesTooLargeMessageSummary = 'attachments exceed size limit';
  filesTooLargeMessageDetail = 'please remove one or more attachments';

  constructor(private uploadService: UploadFileService,
              private alertService: AlertService,
              private configService: ConfigService,
              private sanitizer: DomSanitizer,
              private zone: NgZone ) {
    this.s3 = this.configService.get().s3;
  }

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
      this.removedFileSize = (this.uploadedFiles[index].size / 1000000);
      this.totalAttachSize -= this.removedFileSize;
      this.uploadedFiles.splice(index, 1);
      if (this.uploadedFiles.length === 0) {
        this.uploadReady = false;
      }
      this.removeFile.emit({name: this.removedFileName, size: this.removedFileSize});
  }

  onUpload(event) {
      this.uploadReady = false;
      this.currentUpload = true;
      const self = this;
      const bucket = new S3(this.s3.attachments.credential);

      for (const file of event.files) {
            file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
            file.isImage = /^image\//.test(file.type);
            this.uploadedFiles.push(file);
            this.totalAttachSize += (file.size / 1000000);
            if (this.totalAttachSize > 26) {
              this.pFileUpload.msgs.push({
                  severity: 'error',
                  summary: this.filesTooLargeMessageSummary,
                  detail: this.filesTooLargeMessageDetail
              });
              this.totalAttachSize -= (file.size / 1000000);
              const index = this.uploadedFiles.indexOf(file);
              this.remove(index);
              this.uploadReady = false;
              this.currentUpload = false;
              break;
            }
            if (file.name.length > 50 ) {
              this.pFileUpload.msgs.push({
                  severity: 'error',
                  summary: this.fileNameTooLongMessageSummary.replace('{0}', file.name),
                  detail: this.fileNameTooLongMessageDetail
              });
              this.totalAttachSize -= (file.size / 1000000);
              const index = this.uploadedFiles.indexOf(file);
              this.remove(index);
              this.uploadReady = false;
              this.currentUpload = false;
              break;
            }
            const params = {
              Bucket: this.s3.attachments.bucket,
              Key: `${this.s3.attachments.folder}/${file.name}`,
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
