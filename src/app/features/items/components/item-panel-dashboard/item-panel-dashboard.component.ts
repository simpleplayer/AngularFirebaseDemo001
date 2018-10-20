import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef,} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
//import { ItemPanelDetailComponent } from '../item-panel-detail/item-panel-detail.component';

@Component({
  selector: 'app-item-panel-dashboard',
  templateUrl: './item-panel-dashboard.component.html',
  styleUrls: ['./item-panel-dashboard.component.scss']
})
export class ItemPanelDashboardComponent implements OnInit, OnDestroy {
  /** Based on the screen size, switch from standard to one column per row */
  /*
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
  */

  // The reference "myComponentContainer" is defined in corresponding html
  //@ViewChild("myComponentContainer", { read: ViewContainerRef }) container;
  // The component "ItemPanelDetailComponent" will be created dynamically
  //componentRef: ComponentRef<ItemPanelDetailComponent>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    //private resolver: ComponentFactoryResolver
  ) {
  }



  ngOnInit() {
    /*
    this.load();
    */
  }

  ngOnDestroy() {
    /*
    if (this.componentRef)
      this.componentRef.destroy();
      */
  }

  /*
  refresh() {
    this.load();
  }


  load() {
    // See https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d
    if (this.container) {
      console.log('load')
      this.container.clear();
      const factory: ComponentFactory<ItemPanelDetailComponent> = this.resolver.resolveComponentFactory(ItemPanelDetailComponent);
      this.componentRef = this.container.createComponent(factory);
    }
  }
  */

}
