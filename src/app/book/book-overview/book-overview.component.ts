import {Component} from '@angular/core';
import {Book} from '../book';
import {Observable} from 'rxjs';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;
  selectedBook: Book | undefined;

  constructor(private readonly books: BookService) {
    this.books$ = books.values$;
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return book === this.selectedBook;
  }

  updateBooksWith(changedBook: Book) {
    this.books.update(changedBook)
      .subscribe(book => this.selectedBook = book);
  }
}
