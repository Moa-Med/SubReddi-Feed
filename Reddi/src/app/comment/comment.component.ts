import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() public comment : any;

  public replies : any[] = null;
  public showReplies : boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.comment.data) {
      if(this.comment.data.replies)
        if(this.comment.data.replies.data)
          this.replies = this.comment.data.replies.data.children;
    }
  }

  public dateConverter(ms : number) : Date {
    return new Date(ms*1000);
  }

}
/* Mohamed Traore */