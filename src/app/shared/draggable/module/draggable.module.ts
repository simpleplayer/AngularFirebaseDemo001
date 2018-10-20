import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../directives/draggable.directive';
import { MovableDirective } from '../directives/movable.directive';
import { SortableDirective } from '../directives/sortable.directive';
import { DroppableDirective } from '../directives/droppable.directive';
import { DraggableContainerDirective } from '../directives/draggable-container.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DraggableDirective, 
    MovableDirective, 
    SortableDirective,
    DroppableDirective,
    DraggableContainerDirective
  ],
  exports: [
    DraggableDirective, 
    MovableDirective, 
    SortableDirective,
    DroppableDirective,
    DraggableContainerDirective
  ],
})
export class DraggableModule { }
