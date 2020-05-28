import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {SharedModule} from './shared/shared.module';
import {RouterModule} from '@angular/router';
import {BookOverviewComponent} from './book/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/book-details/book-details.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookModule,
    SharedModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {
        path: 'books',
        component: BookOverviewComponent
      },
      {
        path: 'book',
        component: BookDetailsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
