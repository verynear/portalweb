export class Site {
    id: number;
    // address1: string;
    // address2: string;
    city: string;
    // contactEmail: string;
    name: string;
    // propertyCode: string;
    // siteStatus: number;
    // userid: number;
    // zip: string;
    state: string;
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
