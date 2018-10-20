import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { SortService } from '../services/sort.service';

@Directive({
  selector: '[appSort]',
  
})
export class SortDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private _cdkColumnDef: CdkColumnDef,
    private sortService: SortService
  ) {
  }
  ngOnInit() {
  
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cursor='pointer';
  }
  @HostListener('mouseleave') onMouseLeave() {
  }
  @HostListener('click') onClick() {
    this.adjustSort(this._cdkColumnDef.name);
  }
  adjustSort(key: string) {
    this.sortService.adjustSort(key);
  }
}
