import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  },
  {
    path: ':id',
    component: ArticlePageComponent
  },
  {
    path: "**",
    redirectTo: '',
    pathMatch: 'full'
  }
];
