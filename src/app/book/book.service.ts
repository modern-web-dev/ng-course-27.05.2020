import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from './book';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private idSeq = 0;
  private readonly bookSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'John Example',
      title: 'Angular in action'
    },
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    },
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
  ]);

  values$ = this.bookSubject.asObservable();

  getOne(id: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.bookSubject.getValue();
      const book = currentBooks.find(currentBook => currentBook.id === id);
      if (book) {
        subscriber.next(book);
        subscriber.complete();
      } else {
        subscriber.error(`No book with id ${id} found`);
      }
    }).pipe(delay(2000));
  }

  saveOrUpdate(bookToSaveOrUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.bookSubject.getValue();
      let newBooks;
      let currentBook: Book;
      if (bookToSaveOrUpdate.id >= 0) {
        currentBook = {...bookToSaveOrUpdate};
        newBooks = currentBooks.map(
          book => book.id === currentBook.id ? currentBook : book);
      } else {
        currentBook = {...bookToSaveOrUpdate, id: this.idSeq++};
        newBooks = [...currentBooks, currentBook];
      }
      this.bookSubject.next(newBooks);
      subscriber.next(currentBook);
      subscriber.complete();
    });
  }
}
