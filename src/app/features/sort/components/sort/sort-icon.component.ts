import { Component, OnInit, Input } from '@angular/core';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.scss']
})
export class SortIconComponent implements OnInit {

  @Input()
  private sortKey: string;

  _isAscending: boolean = false;
  _isSortKey: boolean = false;

  constructor(private sortService: SortService) {
  }

  ngOnInit() {
  }

  get isAscending(): boolean {
    return this.sortService.sortDirection === 'asc' ? true : false;
  }
  get isSortKey(): boolean {
    return this.sortService.sortKey === this.sortKey ? true : false;
  }


}
