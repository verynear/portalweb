export class Message {
  totalReceipts: number;
  readReceipts: number;
  unreadReceipts: number;
  messageRecipients: MessageRecipients[];
  id: number;
  messageType: string;
  type: string;
  message: string;
  selected: boolean;
  subject: string;
  createDate: Date;
  rentalsitesId: number;
  rentalsiteBuildingIds: Array<any>;
  rentalsiteBuildingUnitIds: Array<any>;
  tenantIds: Array<any>;
}

export class MessageRecipients {
  emailAddress: number;
  firstname: string;
  lastname: string;
  phone: string;
  isArchived: string;
  isRead: string;
  updateDate: Date;
  rentalSite: string;
  rentalSiteBuilding: string;
  rentalSiteBuildingUnit: string;
}
