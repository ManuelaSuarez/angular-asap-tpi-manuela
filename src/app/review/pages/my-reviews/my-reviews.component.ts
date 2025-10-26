import { Component, inject } from '@angular/core'
import { ReviewService } from '@app/review/services/review.service'
import { Router } from '@angular/router'
import { ReviewListComponent } from '@app/review/components/review-list/review-list.component'

@Component({
  selector: 'my-reviews',
  imports: [ReviewListComponent],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.css',
})
export default class MyReviewsComponent {
  private reviewService = inject(ReviewService)
  private router = inject(Router)

  reviews = this.reviewService.getReviews()

  onNewReviewClick() {
    this.router.navigate(['/sidebar/newReview'])
  }
}