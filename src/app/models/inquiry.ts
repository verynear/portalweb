export class Inquiry {
  id: number;
  createDate: Date;
  message: string;
  messageType: string;
  subject: string;
  selected: boolean;
  tenant: Tenant1;
}

export class Tenant1 {
  emailAddress: number;
  firstname: string;
  lastname: string;
  phone: string;
}
