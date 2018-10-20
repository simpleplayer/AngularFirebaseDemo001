import { Directive, ElementRef, HostBinding, HostListener, Input, Host, AfterContentInit } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Position } from '../model/position'
import { DraggableContainerDirective } from './draggable-container.directive';
import { Boundaries } from '../model/boundaries';
@Directive({
  selector: '[appMovable]'
})




export class MovableDirective extends DraggableDirective implements AfterContentInit {



  @HostBinding('style.transform') get transform(): SafeStyle {
    return  this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  ngAfterContentInit() {
  }
  
  @HostBinding('class.movable') movable = true;

  private boundaries: Boundaries;
  private position: Position = { x: 0, y: 0 };
  private startPosition: Position = { x: 0, y: 0 };

  @Input('appMovableReset') reset = false;

  constructor(
    private sanitizer: DomSanitizer,
    public element: ElementRef,
    @Host() private draggableContainerDirective: DraggableContainerDirective
  ) {
    super();
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    console.log('dragMove', event.clientX + '-' + this.startPosition.x)
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    this.measureBoundaries(this.position);

  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.reset) {
      this.position = { x: 0, y: 0 };
    }
  }

  private measureBoundaries(position: Position) {
   
    this.boundaries = {
      minX: this.element.nativeElement.getBoundingClientRect().left,
      maxX: this.element.nativeElement.getBoundingClientRect().right,
      minY: this.element.nativeElement.getBoundingClientRect().top,
      maxY: this.element.nativeElement.getBoundingClientRect().bottom
    };
    
    
    console.log('this.boundaries.minX  ', this.boundaries.minX );
    console.log('this.draggableContainerDirective.boundaries.minX', this.draggableContainerDirective.boundaries.minX);
    
    
  }

  private maintainBoundaries(position: Position) {
    position.x = Math.max(this.boundaries.minX, position.x);
    position.x = Math.min(this.boundaries.maxX, position.x);
    position.y = Math.max(this.boundaries.minY, position.y);
    position.y = Math.min(this.boundaries.maxY, position.y);
    return position;
  }
}
