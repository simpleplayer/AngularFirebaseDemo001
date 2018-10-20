import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { ButtonPagination } from '../../model/buttonPagination';
import { from, Observable } from 'rxjs';
import { merge } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {


  // An array representing only the buttons for the page numbers that will be displayed eg 1 ... 10 11 12 ... 15
  private _buttons: ButtonPagination[] = [];
  private _nbrOfButtons: number;
  // Getter and Setters
  set nbrOfButtons(nbrOfButtons: number) {
    this._nbrOfButtons = nbrOfButtons;
  }
  get nbrOfButtons(): number {
    return this._nbrOfButtons;
  }

  set buttons(buttons: ButtonPagination[]) {
    this._buttons = buttons;
  }
  get buttons(): ButtonPagination[] {
    return this._buttons;
  }

  constructor(public paginationService: PaginationService) {
    this.nbrOfButtons = 7;
  }

  ngOnInit() {
    from(new Observable<any>()).pipe(
      merge(
        this.paginationService.page$, 
        this.paginationService.pageSize$, 
        this.paginationService.dataSize$)
      )
      .subscribe(() => this.resetPaginationButtons());
  }


  // ===========================================================
  // Reset the pagination depending on the total number of rows
  // ===========================================================
  resetPaginationButtons() {

    // Calculations for the pages

    let buttons: ButtonPagination[] = [];
    let nbrOfPages: number;
    let activePage: number = this.paginationService.page;
    let dataSize: number = this.paginationService.dataSize;
    let pageSize: number = this.paginationService.pageSize;

    nbrOfPages = Math.ceil(dataSize / pageSize);
    let nbrOfButtons: number = this.nbrOfButtons;

    let maxPage = nbrOfPages - 1;




    // Set the buttons for pagination, cause there might be less buttons then pages
    let half1 = Math.floor(nbrOfButtons / 2);
    let half2 = Math.ceil(nbrOfButtons / 2);

    // Check the value of the active page
    // The outcome of these checks wil result in displaying the pagenbrs as
    // one of following (in case of 15 pages max):
    // 1  2  3  4  5  ... 15
    // 1 ...  4  5  6 ... 15
    // 1 ...  11 12 13 14 15
    let start = 0;
    let end = 0;
    start = Math.max(0, activePage - half1)
    if (start == 0) {
      end = Math.min(nbrOfPages, start + nbrOfButtons);
    } else {
      end = Math.min(nbrOfPages, activePage + half2);
      if (end == nbrOfPages) {
        start = Math.max(0, nbrOfPages - nbrOfButtons)
      } else {
        start = activePage - half1;
        end = activePage + half2;
      }
    }
    for (let i = start; i < end; i++) {
      let type = 'active';
      if (i == activePage) {
        type = 'current'
      }
      buttons.push({ value: i, text: (i + 1).toString(), type:type });
      
    }
    // Check if pagination begin pages is like  8  9 10 11 13
    // Then replace by 1 ... 10 12 13
    if (buttons[0] != null && buttons[0].value !== 0) {
      buttons[0].value = 0;
      buttons[0].text = '1';
      buttons[1].value = 'before';
      buttons[1].text = '...';
      buttons[1].type = 'ignore';
    }
    // Check if pagination end pages is like  8  9 10 11 13
    // Then replace by 8  9  10 ... 13
    if (buttons[buttons.length - 1] != null && +buttons[buttons.length - 1].value != maxPage) {
      buttons[buttons.length - 1].value = maxPage;
      buttons[buttons.length - 1].text = (maxPage + 1).toString();
      buttons[buttons.length - 2].value = 'after';
      buttons[buttons.length - 2].text = '...';
      buttons[buttons.length - 2].type = 'ignore';
    }
    // 
    this.buttons = buttons;




  }
  // ===========================================================
  // Used for the pagination buttons with page numbers
  // ===========================================================
  changePage(page: number | string) {
        this.paginationService.changePage(+page);
  }
  // ==================================================
  // Pagesize 
  // ==================================================
  changePageSize(pageSize: number) {
    this.paginationService.changePageSize(pageSize);
  }

  get pageSize() {
    return this.paginationService.pageSize;
  }
  // ==================================================
  // Buttons to go through the pages
  // ==================================================
  onPage(btn: any) {
    this.paginationService.onPage(btn);
  }
  // ==================================================
  // Check if the next, prev buttons should be disabled
  // ==================================================
  isPageDisabled(btn: any) {

    switch (btn) {

      case 'first':
        return this.paginationService.isFirstPage() ? true : false;

      case 'prev':
        return this.paginationService.isFirstPage() ? true : false;

      case 'next':
        return this.paginationService.isLastPage() ? true : false;

      case 'last':
        return this.paginationService.isLastPage() ? true : false;

      default:
        return true;

    }
  }
// ==================================================
  // Check if page button contros should be shown
  // ==================================================
  showPageButtons() {
    const dataSize: number = this.paginationService.dataSize;
    const pageSize: number = this.paginationService.pageSize;
    const nbrOfPages = Math.ceil(dataSize / pageSize);
    return nbrOfPages > 1 ? true:false;
  }


}
