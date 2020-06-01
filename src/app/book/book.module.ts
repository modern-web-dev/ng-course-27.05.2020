import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromBooks from './store/books/books.reducer';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromBooks.featureKey, fromBooks.booksReducer)
  ],
  providers: [],
  exports: [BookOverviewComponent]
})
export class BookModule {}
