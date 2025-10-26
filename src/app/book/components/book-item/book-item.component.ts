import { Component, input } from '@angular/core'
import { IBook } from '@app/book/interfaces/book.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'book-item',
  imports: [],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent {
  book = input.required<IBook>()

  constructor(private router: Router) {}

  onBookClick() {
    this.router.navigate(['/sidebar/bookDetail', this.book().id])
  }
}
