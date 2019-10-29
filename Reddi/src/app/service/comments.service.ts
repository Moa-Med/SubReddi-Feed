import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CommentsService {

  constructor( private http : HttpClient) { }

  public getComments(url : string) : Observable<any> {
    return this.http.get<any>(url+".json")
    .pipe(
      catchError(this.handleError<any>('COMMENTS_GET', null))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
