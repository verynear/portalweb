import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SessionService {
  private session = {};
  private observers = {};
  private observables = {};

  constructor() { }

  set(key: string, value: any): void {
    if (!this.observers[key]) {
      this.createObserver(key, value);
    } else {
      this.observers[key].next(value);
    }

    this.session[key] = value;
  }

  get(key: string): any {
    return this.session[key];
  }

  getObservable(key: string): any {
    if (!this.observables[key]) {
      this.createObserver(key);
    }

    return this.observables[key];
  }

  private createObserver(key, value?: any) {
    this.observables[key] = new Observable((observer) => {
      this.observers[key] = observer;
      if (value) {
        observer.next(value);
      }
    });
  }

}
