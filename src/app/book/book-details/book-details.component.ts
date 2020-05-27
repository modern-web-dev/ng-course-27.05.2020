import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  book: Book;

  @Output()
  bookChange = new EventEmitter<Book>();

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const author = authorElement.value;
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const title = titleElement.value;
    const changedBook: Book = {
      id: this.book.id, author, title
    };
    this.bookChange.emit(changedBook);
  }
}
