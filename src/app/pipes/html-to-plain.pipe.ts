/*
  This custom pipe removes all valid HTML tags from a string.

  @Param: 'str' -- The string containing HTML tags.
  @Return the modified string.
*/

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'htmlToPlain'
})
export class HtmlToPlainPipe implements PipeTransform  {
  constructor() {}
  transform(str) {
    return String(str).replace(/(<([^>]+)>)/gm, '');
  }
}
