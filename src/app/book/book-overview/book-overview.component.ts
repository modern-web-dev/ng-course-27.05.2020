import {Component} from '@angular/core';
import {Book} from '../book';
import {Observable} from 'rxjs';
import {BookService} from '../book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router) {
    this.books$ = books.values$;
  }

  goToDetails(book: Book) {
    this.router.navigate(['/book']);
  }
}
