import {BehaviorSubject, Observable, of} from 'rxjs';
import {Book} from './book';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly bookSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'John Example',
      title: 'Angular in action'
    },
    {
      id: 1,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    },
    {
      id: 2,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
  ]);

  values$ = this.bookSubject.asObservable();

  update(updatedBook: Book): Observable<Book> {
    const bookCopy = {...updatedBook};
    const currentBooks = this.bookSubject.getValue();
    const newBooks = currentBooks.map(
      book => book.id === bookCopy.id ? bookCopy : book);
    this.bookSubject.next(newBooks);
    return of(bookCopy);
  }
}
