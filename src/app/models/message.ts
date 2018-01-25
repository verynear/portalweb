export class Message {
  id: number;
  createDate: Date;
  managementUserId: string;
  message: string;
  messageType: string;
  rentalsitesId: number;
  rentalsiteBuildingIds: Array<any>;
  rentalsiteBuildingUnitIds: Array<any>;
  tenantIds: Array<any>;
  type: string;
  subject: string;
  isRead: boolean;
}
