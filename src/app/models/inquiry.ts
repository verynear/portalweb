export class Inquiry {
  id: number;
  createDate: Date;
  message: string;
  messageType: string;
  subject: string;
  selected: boolean;
  tenant: Tenant1;
  attachmentSize: number;
  generalInquiryAttachments: GeneralInquiryAttachments[];
}

export class Tenant1 {
  emailAddress: number;
  firstname: string;
  lastname: string;
  phone: string;
}

export class GeneralInquiryAttachments {
  url: string;
  fileName: string;
  fileSizeKB: number;
  fileType: string;
}
