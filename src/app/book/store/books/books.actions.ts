import { createAction, props } from '@ngrx/store';
import { Book } from '../../book';

export const setBooks = createAction(
  '[BOOKS] SetBooks',
  props<{ books: Book[] }>()
);

export const selectBook = createAction(
  '[BOOKS] SelectBook',
  props<{ book: Book }>()
);

export const loadBooks = createAction('[BOOKS] LoadBooks');
export const loadBook = createAction(
  '[BOOKS] LoadBooks',
  props<{ bookId: number }>()
);
