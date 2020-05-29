import {Observable} from 'rxjs';
import {Book} from './book';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  getOne(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`);
  }

  saveOrUpdate(bookToSaveOrUpdate: Book): Observable<Book> {
    return bookToSaveOrUpdate.id >= 0 ?
      this.http.put<Book>(
        `api/books/${bookToSaveOrUpdate.id}`, bookToSaveOrUpdate) :
      this.http.post<Book>(
        'api/books', bookToSaveOrUpdate);
  }
}
