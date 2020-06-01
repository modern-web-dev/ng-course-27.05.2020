import { Book } from '../../book';
import { createReducer, on, Action, createSelector } from '@ngrx/store';
import * as fromActions from './books.actions';

export interface State {
  books: Book[];
  selectedBook: Book;
}

export const initalState: State = {
  books: [{ author: 'MJ', title: 'Understanding JS', id: 1 }],
  selectedBook: null
};

export const featureKey = 'books';

const _booksReducer = createReducer(
  initalState,
  on(fromActions.selectBook, (state, { book }) => {
    return { ...state, selectedBook: book };
  }),
  on(fromActions.setBooks, (state, { books }) => ({ ...state, books }))
);

export function booksReducer(state: State | undefined, action: Action) {
  return _booksReducer(state, action);
}
