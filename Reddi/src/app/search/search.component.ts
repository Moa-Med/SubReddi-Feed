import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Item } from '../model/models';
import { DataService } from '../service/data.service';
import { AppService } from '../service/app.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  host: { '(document:keydown)': 'onKeyEvent($event)' }
})
export class SearchComponent implements OnInit {

  @ViewChild('body',{static:false}) public body : ElementRef; //{static:false} second parameter , for upgraded angular 8
  
  public items : Item[] = [];
  public loaded : boolean = false;
  public firstAccess : boolean;

  private searchInput : string = "";
  private itemsInPage : number = 10;
  private page : number = 1;
  
  constructor(
    private dataService : DataService,
    private appService : AppService
  ) {
    this.firstAccess = this.appService.isFirstAccess();
    this.appService.doneFirstAccess();

    this.itemsInPage = (this.dataService.getNumPage() === 0)? 10 : this.dataService.getNumPage();

    this.page = this.appService.getPage();

    this.requestData(this.itemsInPage);
  }

  ngOnInit() {
  }

  public next() {
    if(this.itemsInPage > this.items.length) return;
    var lastId : string = undefined;
    if(this.items.length > 0) {
      lastId = this.items[this.items.length-1].id;
      this.appService.setLasttId(lastId);
    }
    this.requestData(this.itemsInPage, undefined, lastId);

    this.onMove(true);
    this.appService.setPage(++this.page);
  }
  
  public preview() {
    if(this.page == 1) return;
    this.appService.removeLastId();
    var firstId : string = undefined;
    if(this.items.length > 0)
      firstId = this.items[0].id;
    this.requestData(this.itemsInPage, firstId, undefined);
    this.onMove(true);
    this.appService.setPage(--this.page);
 
  }

  public onSearch(s : string) {
    this.searchInput = s;
    this.requestData(this.itemsInPage);
    this.page = 1;
    this.appService.setPage(1);

  }

  public onNumPage(n : number) {
    this.itemsInPage = n;
    this.requestData(this.itemsInPage);
  }

  public onMove(b : boolean) {
    this.body.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }

  public goToSearch() {
    this.appService.doneFirstAccess();
    if(this.firstAccess) {
      this.firstAccess = false;
    }
  }

  public sortByScore() {
    this.items.sort((a, b) => b.score - a.score);
  }

  public sortByComments() {
    this.items.sort((a, b) => b.num_comments - a.num_comments);
  }

  public sortRecent() {
    this.items.sort((a, b) => b.created - a.created);
  }

  //PRIVATE

  private slideDown() {
    var that = this;
    setTimeout(function(){ 
      that.goToSearch();
    }, 3000);
  }

  private onKeyEvent(event: KeyboardEvent) {
    if(event.keyCode === 37) 
      this.preview();
    else if(event.keyCode === 39) 
      this.next();
  }

  private requestData(n : number, idPrev? : string, idNext? : string ) : void {
    this.dataService.setSearch(this.searchInput);
    this.dataService.getData(n, idPrev, idNext, this.appService.getLasttId()).subscribe(
      result => {
        if(result == null) this.items = [];
        else  {
          this.items = this.dataService.buildData(result);
          if(this.items.length > 0) {
            if(this.items[0].author == null) {
              this.items = [];
            }
          }
        }
        this.loaded = true;
      }
    );
  }

  
}
/* Mohamed Traore */