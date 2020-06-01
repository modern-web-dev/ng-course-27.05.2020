import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Data, Router, Params } from '@angular/router';
import { map, pluck, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromActions from '../store/books/books.actions';
import { selectedBook } from '../store/books/books.selectors';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  bookForm: FormGroup;
  private bookId: number | undefined;

  constructor(
    private readonly books: BookService,
    private readonly router: Router,
    route: ActivatedRoute,
    private store: Store
  ) {
    this.bookForm = new FormGroup({
      author: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      title: new FormControl(null, Validators.required)
    });

    route.params.pipe(this.dispatchAction());

    this.store
      .select(selectedBook)
      .pipe(createEmptyBookIfNoBookAvailable(), this.setBookId())
      .subscribe(book => this.bookForm.patchValue(book));
  }

  private setBookId() {
    return tap<Book>(book => (this.bookId = book.id));
  }

  private dispatchAction() {
    return tap((params: Params) =>
      this.store.dispatch(fromActions.loadBook({ bookId: params.bookId }))
    );
  }

  save() {
    if (this.bookForm.valid) {
      const changedBook: Book = {
        ...this.bookForm.value,
        id: this.bookId
      };
      this.books
        .saveOrUpdate(changedBook)
        .subscribe(() => this.router.navigate(['/books']));
    }
  }

  getErrorsOf(controlName: string) {
    const errors =
      this.bookForm.get(controlName) && this.bookForm.get(controlName).errors;
    if (errors) {
      return Object.keys(errors).map(errorKey => {
        switch (errorKey) {
          case 'required':
            return 'Please provide a value';
          case 'maxlength': {
            const errorMeta = errors[errorKey];
            return `Please provide value shorter than ${errorMeta.requiredLength} (currently ${errorMeta.actualLength} characters)`;
          }
          default:
            return 'Unknown error';
        }
      });
    }
  }
}

function getBook() {
  return pluck<Data, Book>('book');
}

function createEmptyBookIfNoBookAvailable() {
  return map<Book | undefined, Book>(book => book || { author: '', title: '' });
}
