import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SortService } from './sort.service';

@Component({
    selector: 'app-th',
    templateUrl: './sortable-column.component.html',
    styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

    constructor(private sortService: SortService) { }

    // The display name for a certain column
    @Input('displayName')
    displayName: string;

    // The (data) valueI  for the column
    @Input('columnName')
    columnName: string;

    // The sort direction (asc / desc)
    @Input('sortDirection')
    sortDirection: string;

    // For instances where we need the padding, but not the functionality.
    @Input('disable')
    disable: boolean;


    private columnSortedSubscription: Subscription;

    @HostListener('click')
    sort() {
        if (this.disable) {
            return;
        }
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName !== event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
