import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Item, ServerDataFull } from '../model/models';

@Injectable()
export class DataService {

  private items : Item[];
  private search : string = null;
  private numPage : number = 0;

  constructor( private http : HttpClient) { }

  public setSearch(input : string) : void {
    if(input == "" && this.search != null) return; 
    this.search = this.addressBuilder(input)
  }

  public setNumPage(n : number) { this.numPage = n; }

  public getNumPage() { return this.numPage; }

  public getData(n : number, idPrev? : string, idNext? : string, lastId? : string ) : Observable<ServerDataFull> {
    this.numPage = n;
    var address : string = this.search+"?limit="+n;
    if(idPrev) {
      address += "&before=t3_"+idPrev;
    }
    if(idNext) {
      address += "&after=t3_"+idNext;
    }
    if(idNext == null && idPrev == null && lastId) {
      address += "&after=t3_"+lastId;
    }
    return this.http.get<ServerDataFull>(address)
    .pipe(
      //tap(result => console.log("DATA_GET")),
      catchError(this.handleError<ServerDataFull>('DATA_GET', null))
    );
  }

  public buildData(data : ServerDataFull) : Item[] {
    if(data == null) return [];    

    this.items  = new Array<Item>();
    data.data.children.forEach(element => {
      this.items.push(element.data);
    });
    return this.items;
  }

  public getItem(id : string ) : Item {
    return this.items.filter( item => item.id === id)[0];
  }

  private addressBuilder(s : string) : string {
    if(s === "") s = "sweden";
    return "https://www.reddit.com/r/"+s+".json";
  } 

  private handleError<T> (_opetation='operation',result?: T){
    return (error: any): Observable<T> => {
      console.debug("NO DATA");
      return of(result as T);
    };
  }

}
/* Mohamed Traore */