import { Component } from '@angular/core';
import { Book } from '../book';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromActions from '../store/books/books.actions';
import { selectAllBooks, AppState } from '../store/books/books.selectors';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(
    private readonly books: BookService,
    private readonly router: Router,
    private store: Store<AppState>
  ) {
    this.books$ = this.store.select(selectAllBooks);
  }

  goToDetails(book: Book) {
    this.store.dispatch(fromActions.selectBook({ book }));
    this.router.navigate(['/book', book.id]);
  }
}
