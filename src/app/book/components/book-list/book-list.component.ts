import { Component, ElementRef, inject, input, viewChild } from '@angular/core'
import { BookItemComponent } from '../book-item/book-item.component'
import type { IBook } from '@app/book/interfaces/book.interface'
import { BookService } from '@app/book/services/book.service'

@Component({
  selector: 'book-list',
  imports: [BookItemComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  bookService = inject(BookService)
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('booksContainer')
  books = input.required<IBook[]>()
  
  handleScroll() {
    const booksContainer = this.scrollDivRef()?.nativeElement
    
    if (!booksContainer) return

    const safetyMargin = 300
    const scrollTop = booksContainer.scrollTop
    const clientHeight = booksContainer.clientHeight
    const maxScroll = booksContainer.scrollHeight
    const isBottomContainer: boolean = scrollTop + clientHeight + safetyMargin >= maxScroll
    
    if (isBottomContainer) {
      this.bookService.getAllBooks()
    }
  }
}