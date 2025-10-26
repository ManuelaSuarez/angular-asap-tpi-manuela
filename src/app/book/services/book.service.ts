import { inject, Injectable, computed, effect, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'
import type { IBook } from '../interfaces/book.interface'
import type { IOpenLibraryResponse } from '../interfaces/open-library-interface'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http: HttpClient = inject(HttpClient)

  apiUrl = 'https://openlibrary.org/search.json'

  allBooks = signal<IBook[]>([])
  allBooksCurrentPage = signal<number>(0)
  booksFromSearch = signal<IBook[]>([])

  loading = signal<boolean>(false)
  
  constructor() {
    this.getAllBooks()
  }

  getAllBooks() {
    if (this.loading()) return
    this.loading.set(true)

    const offset = this.allBooksCurrentPage() * 20

    this.http
      .get<IOpenLibraryResponse>(`${this.apiUrl}`, {
        params: {
          q: "subject:fiction",
          limit: 20,
          offset: offset,
        },
      })
      .pipe(map((response) => this.mapOpenLibraryBooksToIBook(response.docs)))
      .subscribe({
        next: (books) => {
          this.allBooks.update((prev) => [...prev, ...books])
          this.allBooksCurrentPage.update((page) => page + 1)
          this.loading.set(false)
        },
        error: () => {
          this.loading.set(false)
        },
      })
  }

  getBookById(id: string): IBook | null {
    const book = this.allBooks().find((b) => b.id === id)
    if (book) {
      return book
    }
    return null
  }

  searchBooks(query: string) {
    if (!query || query.trim().length === 0) {
      return this.http
        .get<IOpenLibraryResponse>(`${this.apiUrl}`, {
          params: {
            q: "subject:fiction",
            limit: 50,
          },
        })
        .pipe(map((response) => this.mapOpenLibraryBooksToIBook(response.docs)))
    }

    return this.http
      .get<IOpenLibraryResponse>(`${this.apiUrl}`, {
        params: {
          q: query,
          limit: 50,
        },
      })
      .pipe(map((response) => this.mapOpenLibraryBooksToIBook(response.docs)))
  }

  mapOpenLibraryBooksToIBook(docs: IOpenLibraryResponse["docs"]): IBook[] {
    return docs.map((doc) => ({
      id: doc.key,
      title: doc.title,
      author: doc.author_name?.[0] || "Unknown Author",
      cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "/abstract-book-cover.png",
      synopsis: `Published in ${doc.first_publish_year || "Unknown"}. A captivating story that will keep you engaged from start to finish.`,
    }))
  }
}