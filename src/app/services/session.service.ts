import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private session = {};

  constructor() { }

  set(key: string, value: any): void {
    this.session[key] = value;
  }

  get(key: string): any {
    return this.session[key];
  }

}
