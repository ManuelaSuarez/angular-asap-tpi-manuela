import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sidebar',
        async loadComponent() {
            const { SidebarComponent } = await import('@app/sidebar/pages/sidebar.component')
            return SidebarComponent
        },
        children: [
            {
                path: 'allBooks',
                loadComponent: () => import('@app/book/pages/all-books/all-books.component')
            },
            {
                path: 'bookDetail/:id',
                loadComponent: () => import('@app/book/pages/book-detail/book-detail.component')
            },
            {
                path: 'myReviews',
                loadComponent: () => import('@app/review/pages/my-reviews/my-reviews.component')
            },
            {
                path: 'reviewDetail/:id',
                loadComponent: () => import('@app/review/pages/review-detail/review-detail.component')
            },
            {
                path: 'newReview',
                loadComponent: () => import('@app/review/pages/new-review/new-review.component')
            },
            {
                path: '**',
                redirectTo: 'allBooks'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'sidebar'
    }
]
