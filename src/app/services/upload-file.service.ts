import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadFileService {

FOLDER = 'noi-s3/';

  constructor() { }

  uploadfile(file) {

    const bucket = new S3(
      {
        accessKeyId: 'AKIAI6JR7BFD4VQVVDKA',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    const params = {
      Bucket: 'noi-angular5-bucket',
      Key: this.FOLDER + file.name,
      Body: file
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}
