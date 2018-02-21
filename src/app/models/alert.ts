export class Alert {
    type: AlertType;
    message: string;
    alertLink: boolean;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
