import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BookService } from '@app/book/services/book.service'
import { IBook } from '@app/book/interfaces/book.interface'

@Component({
  selector: 'book-detail',
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export default class BookDetailComponent {
  private route: ActivatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  
  bookService = inject(BookService)
  book = signal<IBook | null>(null)
  bookId = this.route.snapshot.paramMap.get('id')

  loading = this.bookService.loading

  constructor() {
    if (this.bookId) {
      const foundBook = this.bookService.getBookById(this.bookId)
      if (foundBook) {
        this.book.set(foundBook)
      }
    }
  }

  onReviewClick() {
    if (this.book()) {
      this.router.navigate(['/sidebar/newReview'], {
        queryParams: { bookTitle: this.book()!.title, bookCover: this.book()!.cover },
      })
    }
  }

  goBack() {
    this.router.navigate(['/sidebar/allBooks'])
  }
}