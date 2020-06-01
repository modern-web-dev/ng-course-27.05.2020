import * as fromBooks from './books.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  books: fromBooks.State;
}

export const selectFeature = createFeatureSelector<AppState, fromBooks.State>(
  fromBooks.featureKey
);

export const selectAllBooks = createSelector(
  selectFeature,
  state => state.books
);

export const selectedBook = createSelector(
  selectFeature,
  state => state.selectedBook
);
