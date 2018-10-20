import { Directive, ElementRef, OnInit, HostBinding } from '@angular/core';
import { Boundaries } from '../model/boundaries';


@Directive({
  selector: '[appDraggableContainer]'
})
export class DraggableContainerDirective implements OnInit {



  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }

  get boundaries(): Boundaries {
    const boundaries: Boundaries = {
      minX: this.element.nativeElement.getBoundingClientRect().left,
      maxX: this.element.nativeElement.getBoundingClientRect().right,
      minY: this.element.nativeElement.getBoundingClientRect().top,
      maxY: this.element.nativeElement.getBoundingClientRect().bottom
    };
    return boundaries;
  }

}
