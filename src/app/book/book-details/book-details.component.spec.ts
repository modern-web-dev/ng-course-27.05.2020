import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookDetailsComponent} from './book-details.component';
import {Book} from '../book';

fdescribe('BookDetailsComponent', () => {
  let originalBook: Book;

  beforeEach(() => {
    originalBook = {id: 123, title: 'Test title', author: 'Test author'};
  });

  describe('(class)', () => {
    it('notifies on book change', () => {
      // given
      const changedTitle = 'Changed title';
      const changedAuthor = 'Changed author';
      const eventMock: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector: jasmine.createSpy('querySelector')
            .and.callFake(selector => ({
              value: selector === '#author' ? changedAuthor : changedTitle
            }))
        }
      };
      const component = new BookDetailsComponent();
      component.book = originalBook;
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(eventMock.target.querySelector).toHaveBeenCalledTimes(2);
        expect(eventMock.target.querySelector).toHaveBeenCalledWith('#author');
        expect(eventMock.target.querySelector).toHaveBeenCalledWith('#title');
        expect(updatedBook.id).toBe(originalBook.id);
        expect(updatedBook.author).toBe(changedAuthor);
        expect(updatedBook.title).toBe(changedTitle);
      });
      // when
      component.notifyOnBookChange(eventMock);
    });
  });

  describe('(DOM)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule(
        {declarations: [BookDetailsComponent]})
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent<BookDetailsComponent>(BookDetailsComponent);
          component = fixture.componentInstance;
          element = fixture.nativeElement as HTMLElement;
        });
    });

    it('shows an author and a title in text fields', () => {
      // given
      component.book = originalBook;
      // when
      fixture.detectChanges();
      // then
      const authorElement = element.querySelector<HTMLInputElement>('input#author');
      expect(authorElement.value).toBe(originalBook.author);
    });
  });
});
