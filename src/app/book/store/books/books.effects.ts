import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './books.actions';
import { BookService } from '../../book.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadBooks),
      switchMap(() => {
        return this.booksService
          .getAll()
          .pipe(map(books => fromActions.setBooks({ books })));
      })
    )
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadBook),
      switchMap(action => {
        return this.booksService
          .getOne(action.bookId)
          .pipe(map(book => fromActions.selectBook({ book })));
      })
    )
  );

  constructor(private actions$: Actions, private booksService: BookService) {}
}
