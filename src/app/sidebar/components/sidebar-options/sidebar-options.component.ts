import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { IMenuOption } from '@app/sidebar/interfaces/menu-option.interface'

@Component({
  selector: 'sidebar-options',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-options.component.html',
  styleUrl: './sidebar-options.component.css'
})
export class SidebarOptionsComponent {
  menuOptions: IMenuOption[] = [
    {
      icon: "auto_stories",
      label: "All books",
      subLabel: "Find the perfect one for you!",
      route: "/sidebar/allBooks"
    },
    {
      icon: "reviews",
      label: "My reviews",
      subLabel: "Remember what you liked! or disliked...",
      route: "/sidebar/myReviews"
    },
    {
      icon: "draw",
      label: "New review",
      subLabel: "Feeling inspired?",
      route: "/sidebar/newReview"
    }
  ]
}
