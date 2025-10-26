import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReviewService } from '@app/review/services/review.service'
import type { IReview } from '@app/review/interfaces/review.interface'
import { CommonModule } from '@angular/common'
import { BidiModule } from "@angular/cdk/bidi";

@Component({
  selector: 'review-detail',
  imports: [CommonModule, BidiModule],
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.css',
})
export default class ReviewDetailComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  reviewService = inject(ReviewService)

  review = signal<IReview | null>(null)

  constructor() {
    const reviewId = Number(this.route.snapshot.paramMap.get('id'))
    if (reviewId) {
      const foundReview = this.reviewService.getReviewById(reviewId)
      if (foundReview) {
        this.review.set(foundReview)
      }
    }
  }

  goBack() {
    this.router.navigate(['/sidebar/myReviews'])
  }

  getStarArray() {
    const ratingValue = Number(this.review()?.rating || 0)

    return Array(5).fill(0).map((_, i) => i < ratingValue)
  }
}
