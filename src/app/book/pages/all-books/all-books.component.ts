import { Component, inject } from '@angular/core';
import { BookService } from '@app/book/services/book.service';
import { BookListComponent } from '@app/book/components/book-list/book-list.component';

@Component({
  selector: 'books',
  imports: [BookListComponent],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export default class AllBooksComponent {
  bookService = inject(BookService)
}