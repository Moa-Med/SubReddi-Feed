import { Component, Output, EventEmitter } from '@angular/core';
import { AppService } from '../service/app.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: { '(document:keydown)': 'onEnterEvent($event)' }
})
export class HeaderComponent {

  @Output() goToBody : EventEmitter<boolean> = new EventEmitter();

  constructor( ) { }

  public onClick() {
    this.goToBody.emit(true);
  }

  private onEnterEvent(event: KeyboardEvent) {
    if(event.keyCode === 13) { //ENTER
     this.onClick();
    }
  }

}
/* Mohamed Traore */