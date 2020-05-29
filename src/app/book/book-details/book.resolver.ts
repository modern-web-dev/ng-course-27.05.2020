import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../book';
import {Observable, throwError} from 'rxjs';
import {BookService} from '../book.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const params = route.paramMap;
    if (params.has('bookId')) {
      const bookIdAsString: string = params.get('bookId');
      const bookId: number = +bookIdAsString;
      if (bookId >= 0) {
        return this.books.getOne(bookId)
          .pipe(
            catchError(error => {
              this.router.navigate(['/books']);
              return throwError(error);
            })
          );
      } else {
        this.router.navigate(['/book']);
      }
    }
  }
}
