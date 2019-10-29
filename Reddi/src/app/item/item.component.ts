import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Item } from '../model/models';
import { DataService } from '../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../service/app.service';
import { CommentsService } from '../service/comments.service';
//entry component
@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  host: { '(document:keydown)': 'onEscEvent($event)' }
})
export class ItemComponent implements OnInit {

  public item : Item;
  public potrait : boolean = false;
  public comments : any;
  public imageUrlError : boolean = false;
  public showFocus : boolean = false;

  @ViewChild('image',{static:false}) image: ElementRef; //angular 8 {static:false} second argument

  constructor(
    private dataService : DataService,
    private commentsService : CommentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    var id : string = this.route.snapshot.paramMap.get('id');
    this.item = this.dataService.getItem(id);
   }

  ngOnInit() {
    if(!this.item) this.router.navigate(['/']);
    this.getComments();
    this.checkURL(this.item.url);
  }

  public imageLoaded() {
    this.potrait = (this.image.nativeElement.height > this.image.nativeElement.width);
  }

  public dateConverter(ms : number) : Date {
    return new Date(ms*1000);
  }

  public getComments() {
    if(this.item == null) return;
    if(this.item.permalink == null) return;
    this.commentsService.getComments("https://www.reddit.com"+this.item.permalink.slice(0, -1)).subscribe(
      result => {
        this.comments = result[1].data.children;
      }
    );
  }

  public onImageError() {
    console.log("error");
    this.imageUrlError = true
  }

  public checkURL(url : string) {
    this.imageUrlError = !(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  public checkUrlSelfOrDefault(url : string) {
    if(url == null) return "assets/img/reddit.jpg";
    if(url.match(/.*(self|default)$/) != null) {
      return "assets/img/reddit.jpg";
    } else {
      return url;
    }
  }

  public goBack() : void {
    this.router.navigate(['/']);
  }

  private onEscEvent(event: KeyboardEvent) {
    if(event.keyCode === 27) { //ESC
      if(this.showFocus) {
        this.showFocus = false;
      } else {
        this.goBack();
      }
    }
  }

}
//**Mohamed Traore */