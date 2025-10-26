import { Component, input } from "@angular/core"
import { ReviewItemComponent } from "../review-item/review-item.component"
import type { IReview } from "@app/review/interfaces/review.interface"

@Component({
  selector: "review-list",
  imports: [ReviewItemComponent],
  templateUrl: "./review-list.component.html",
  styleUrl: "./review-list.component.css",
})
export class ReviewListComponent {
  reviews = input.required<IReview[]>()
}