/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, ViewEncapsulation} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-item-test-cdk-drag-drop',
  templateUrl: 'item-test-cdk-drag-drop.component.html',
  styleUrls: ['item-test-cdk-drag-drop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ItemTestCdkDragDropComponent {
  axisLock: 'x' | 'y';
  todo = [
    'Go out for Lunch',
    'Make a cool app',
    'Watch TV',
    'Eat a healthy dinner',
    'Go to sleep'
  ];
  done = [
    'Get up',
    'Have breakfast',
    'Brush teeth',
    'Check reddit'
  ];

  horizontalData = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century'
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('dnd-move', sanitizer.bypassSecurityTrustHtml(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5` +
          `-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    `));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}