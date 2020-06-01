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
