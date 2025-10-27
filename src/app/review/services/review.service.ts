import { Injectable, signal } from "@angular/core"
import type { IReview } from "../interfaces/review.interface"

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private reviews = signal<IReview[]>([])

  constructor() {
    this.loadReviewsFromStorage()
  }

  getReviews() {
    return this.reviews.asReadonly()
  }

  addReview(review: Omit<IReview, "id" | "date">) {
    const newReview: IReview = {
      id: crypto.randomUUID(),
      date: new Date(),
      bookTitle: review.bookTitle,
      bookCover: review.bookCover,
      content: review.content,
      rating: review.rating,
    }

    this.reviews.update((prev) => [...prev, newReview])
    this.saveReviewsToStorage()
  }

  getReviewById(id: string) {
    return this.reviews().find((review) => review.id === id)
  }

  deleteReview(id: string) {
    this.reviews.update((prev) => prev.filter((review) => review.id !== id))
    this.saveReviewsToStorage()
  }

  updateReview(id: string, content: string) {
    this.reviews.update((prev) => prev.map((review) => (review.id === id ? { ...review, content } : review)))
    this.saveReviewsToStorage()
  }

  private saveReviewsToStorage() {
    localStorage.setItem("bookReviews", JSON.stringify(this.reviews()))
  }

  private loadReviewsFromStorage() {
    const stored = localStorage.getItem("bookReviews")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        this.reviews.set(
          parsed.map((r: any) => ({
            ...r,
            date: new Date(r.date),
          })),
        )
      } catch (e) {
        console.error("Error loading reviews from storage", e)
      }
    }
  }
}
