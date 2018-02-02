export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    managementCompanyId: number;
    defaultRentalSiteId: number;
    userRentalSitesRefs: Array<any>;
}
