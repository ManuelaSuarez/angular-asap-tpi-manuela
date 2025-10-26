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
      icon: "trending_up",
      label: "All books",
      subLabel: "Los más populares",
      route: "/sidebar/allBooks"
    },
    {
      icon: "search",
      label: "My reviews",
      subLabel: "Encuentra tus gifs",
      route: "/sidebar/myReviews"
    },
    {
      icon: "search",
      label: "New review",
      subLabel: "Encuentra tus gifs",
      route: "/sidebar/newReview"
    }
  ]
}
