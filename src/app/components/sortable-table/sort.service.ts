import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortService {

    constructor() {}

    private columnSortedSource = new Subject<ColumnSortedEvent>();
    columnSorted$ = this.columnSortedSource.asObservable();

    columnSorted(event: ColumnSortedEvent) {
      this.columnSortedSource.next(event);

    }

    sortHelper(a, b, criteria) {
      let direction = 1;

      if (criteria.sortDirection === 'desc') {
        direction = -1;
      }

      if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
        return 1 * direction;
      } else if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
        return -1 * direction;
      } else {
        return 0;
      }
    }
}

export interface ColumnSortedEvent {
    sortColumn: string;
    sortDirection: string;
}
