import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Book } from '../book';
import { Observable, throwError } from 'rxjs';
import { BookService } from '../book.service';
import { catchError, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectedBook } from '../store/books/books.selectors';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book> {
  constructor(
    private readonly books: BookService,
    private readonly router: Router,
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const params = route.paramMap;
    if (params.has('bookId')) {
      return this.store.select(selectedBook).pipe(take(1));
    }
  }
}
