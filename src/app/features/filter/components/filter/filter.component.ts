import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @ViewChild('filter') filter: ElementRef;
  subscription: Subscription;

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
    // Filter field
    this.subscription = fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(100),
      distinctUntilChanged()
    )
      .subscribe(() => {
        this.filterService.filterChanged(this.filter.nativeElement.value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
