import { Component, input } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from "@angular/common"
import type { IReview } from '@app/review/interfaces/review.interface'

@Component({
  selector: 'review-item',
  imports: [CommonModule],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css'
})
export class ReviewItemComponent {
  review = input.required<IReview>()  

  constructor(private router: Router) {}

  onReviewClick(id: string) {
    this.router.navigate(['/sidebar/reviewDetail', id])
  }

  onNewReviewClick() {
    this.router.navigate(['/sidebar/newReview'])
  }
}
