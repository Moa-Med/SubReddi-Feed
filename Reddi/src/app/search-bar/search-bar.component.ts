import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  public searchInput : string = "";
  public itemsInPage : number = 10;

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() itemsNum : EventEmitter<number> = new EventEmitter();
  @Output() sortScore : EventEmitter<boolean> = new EventEmitter();
  @Output() sortComments : EventEmitter<boolean> = new EventEmitter();
  @Output() sortRecent : EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public onSearch() {
    this.search.emit(this.searchInput.replace(/\s/g, ""));
  }

  public onPageChange(n : number) {
    this.itemsInPage = n;
    this.itemsNum.emit(n);
  }

  public onSortScore() {
    this.sortScore.emit(true);
  }

  public onSortComments() {
    this.sortComments.emit(true);
  }

  public onSortRecent() {
    this.sortRecent.emit(true);
  }

}
/*Mohamed 2019*///