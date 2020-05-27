import {Component} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | undefined;

  constructor() {
    this.books = [
      {
        author: 'John Example',
        title: 'Angular in action'
      },
      {
        author: 'Douglas Crockford',
        title: 'JavaScript. The good parts'
      },
      {
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      },
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return book === this.selectedBook;
  }
}
