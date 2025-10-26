import { Component, inject, signal, type OnInit } from '@angular/core'
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ReviewService } from '@app/review/services/review.service'
import { BookService } from '@app/book/services/book.service'
import { CommonModule } from '@angular/common'
import { debounceTime, distinctUntilChanged } from 'rxjs'

@Component({
  selector: 'new-review',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css',
})
export default class NewReviewComponent implements OnInit {
  fb = inject(FormBuilder)
  router = inject(Router)
  route = inject(ActivatedRoute)
  reviewService = inject(ReviewService)
  bookService = inject(BookService)

  reviewForm: FormGroup
  selectedRating = signal<number>(0)
  searchResults = signal<Array<{ title: string; cover: string }>>([])
  showDropdown = signal<boolean>(false)
  searchQuery = signal<string>('')
  isSelectingBook = false

  constructor() {
    this.reviewForm = this.fb.group({
      bookTitle: ['', Validators.required],
      bookCover: [''],
      content: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['bookTitle']) {
        this.isSelectingBook = true
        this.reviewForm.patchValue({
          bookTitle: params['bookTitle'],
          bookCover: params['bookCover'] || '',
        })
        this.searchQuery.set(params['bookTitle'])
        this.isSelectingBook = false
      }
    })

    this.reviewForm
      .get('bookTitle')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (this.isSelectingBook) {
          return
        }

        this.searchQuery.set(value)

        if (value && value.length > 2) {
          this.searchBooks(value)
        } else {
          this.searchResults.set([])
          this.showDropdown.set(false)
        }
      })
  }

  searchBooks(query: string) {
    this.bookService.searchBooks(query).subscribe((books) => {
      this.searchResults.set(books.map((b) => ({ title: b.title, cover: b.cover })))
      this.showDropdown.set(books.length > 0 && !this.isSelectingBook)
    })
  }

  selectBook(book: { title: string; cover: string }) {
    this.isSelectingBook = true
    this.reviewForm.patchValue({
      bookTitle: book.title,
      bookCover: book.cover,
    })
    this.searchQuery.set(book.title)
    this.showDropdown.set(false)
    setTimeout(() => {
      this.isSelectingBook = false
    }, 100)
  }

   onInputBlur() {
    setTimeout(() => {
      this.showDropdown.set(false)
    }, 200)
  }

  setRating(rating: number) {
    this.selectedRating.set(rating)
  }

  onSubmit() {
    if (this.reviewForm.valid && this.selectedRating() > 0) {
      this.reviewService.addReview({
        bookTitle: this.reviewForm.value.bookTitle,
        bookCover: this.reviewForm.value.bookCover || '/placeholder.svg?key=0ngjl',
        content: this.reviewForm.value.content,
        rating: this.selectedRating(),
      })
      this.router.navigate(['/sidebar/myReviews'])
    }
  }

  onCancel() {
    this.router.navigate(['/sidebar/myReviews'])
  }

  getStarArray() {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
  }
}
