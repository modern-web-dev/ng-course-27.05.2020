import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {map, pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book$: Observable<Book>;
  private bookId: number | undefined;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              route: ActivatedRoute) {
    this.book$ = route.data
      .pipe(
        getBook(),
        createEmptyBookIfNoBookAvailable(),
        this.setBookId()
      );
  }

  private setBookId() {
    return tap<Book>(book => this.bookId = book.id);
  }

  save(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const author = authorElement.value;
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const title = titleElement.value;
    const changedBook: Book = {
      id: this.bookId, author, title
    };
    this.books.saveOrUpdate(changedBook)
      .subscribe(() => this.router.navigate(['/books']));
  }
}

function getBook() {
  return pluck<Data, Book>('book');
}

function createEmptyBookIfNoBookAvailable() {
  return map<Book | undefined, Book>(book => book || {author: '', title: ''});
}
