/*
  This custom pipe replaces [all] occurences of a char, or string within a string with the empty string: '' 
  "str: string" -- the entire string
  "find: string" -- the characer(s) to replace 
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(str: string, find: string): any {
    var find = find;
    var re = new RegExp(find, 'g');
    str = str.replace(re, '');

    return str;
  }
}
