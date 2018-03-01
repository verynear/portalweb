/*
  This library is part of danrevah / ngx-pipes
  See on Github for documentation.

  Shortening a string by length and providing a custom string to denote an omission
  Usage: string | shorten: length: [suffix|optional]: [wordBreak boolean|optional]

  <p>{{'Hey foo bar' | shorten: 3: '...'}}</p> <!-- Output: "Hey..." -->
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
  transform(input: string, length?: number, suffix?: string, wordBreak?: boolean): string;
  transform(input: any, length?: number, suffix?: string, wordBreak?: boolean): any;

  transform(text: any, length: number = 0, suffix: string = '', wordBreak: boolean = true): string {
    if (!isString(text)) {
      return text;
    }

    if (text.length > length) {
      if (wordBreak) {
        return text.slice(0, length) + suffix;
      }

      // tslint:disable-next-line:no-bitwise
      if (!!~text.indexOf(' ', length)) {
        return text.slice(0, text.indexOf(' ', length)) + suffix;
      }
    }
    return text;
  }
}

export function isString(value: any) {
  return typeof value === 'string';
}
