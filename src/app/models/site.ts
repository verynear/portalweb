export class Site {
    id: number;
    address1: string;
    address2: string;
    city: string;
    contactEmail: string;
    createDate: Date;
    fax: string;
    name: string;
    phone: string;
    propertyCode: string;
    siteStatus: number;
    state: string;
    updateDate: Date;
    userid: number;
    zip: string;
    rentalSitesBrandings: SiteBranding;
}

export class SiteBranding {
  id: number;
  accentColor: string;
  bgColor: string;
  galleryUrl: string;
  logoUrl: string;
  description: string;
  textColor: string;
  domain: string;
}
