/*
  This custom pipe replaces [all] occurences of a char, or string within a string with the empty string: ''

  @Param: 'str' -- The large string.
  @Param: 'find' -- The substring to replace.

  @Return the modified string.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(str: string, find: string): any {
    const re = new RegExp(find, 'g');
    str = str.replace(re, '');

    return str;
  }
}
