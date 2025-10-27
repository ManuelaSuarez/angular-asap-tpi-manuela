import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReviewService } from '@app/review/services/review.service'
import type { IReview } from '@app/review/interfaces/review.interface'
import { CommonModule } from '@angular/common'
import { BidiModule } from '@angular/cdk/bidi'
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'review-detail',
  imports: [CommonModule, BidiModule, FormsModule],
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.css',
})
export default class ReviewDetailComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  reviewService = inject(ReviewService)

  review = signal<IReview | null>(null)
  isEditing = signal<boolean>(false)
  editContent = signal<string>('')

  constructor() {
    const reviewId = this.route.snapshot.paramMap.get('id')
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

  async deleteReview() {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      const reviewId = this.review()?.id
      if (reviewId) {
        this.reviewService.deleteReview(reviewId)
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your review has been deleted.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
        })
        this.router.navigate(['/sidebar/myReviews'])
      }
    }
  }

  startEdit() {
    this.isEditing.set(true)
    this.editContent.set(String(this.review()?.content || ''))
  }

  cancelEdit() {
    this.isEditing.set(false)
    this.editContent.set('')
  }

  async saveEdit() {
    const reviewId = this.review()?.id
    if (reviewId && this.editContent().trim()) {
      this.reviewService.updateReview(reviewId, this.editContent())

      // Update local review signal
      const updatedReview = this.reviewService.getReviewById(reviewId)
      if (updatedReview) {
        this.review.set(updatedReview)
      }

      this.isEditing.set(false)

      await Swal.fire({
        title: 'Updated!',
        text: 'Your review has been updated successfully.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
      })
    }
  }
}
