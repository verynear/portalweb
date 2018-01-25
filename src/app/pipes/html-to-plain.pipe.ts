import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'htmlToPlain'
})
export class HtmlToPlainPipe implements PipeTransform  {
  constructor() {}
  transform(value) {
    return String(value).replace(/(<([^>]+)>)/gm, '');
  }
}
