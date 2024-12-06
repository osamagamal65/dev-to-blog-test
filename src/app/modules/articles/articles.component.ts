import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../interfaces/base-response.interface';
import { ArticleCardComponent } from './article-card/article-card.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ArticleCardComponent, InfiniteScrollDirective, FormsModule],
  providers: [ArticlesService],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  loading: boolean = false;
  articles: Article[] = [];
  searchQuery: string = '';
  err?: any;

  searchSubject = new BehaviorSubject<string>('');

  constructor(private service: ArticlesService) {

  }

  ngOnInit(): void {
    this.getArticles();

    this.searchSubject.pipe(
      debounceTime(300), distinctUntilChanged()
    ).subscribe(query => {
      if (query.length > 0) {
        this.service.query = query;
        this.getArticles();
        this.articles = [];

      } else {
        this.articles = [];
        this.service.query = '';
        if (this.articles.length === 0) {
          this.getArticles();
        }
      }

    });
  }

  getArticles() {
    this.loading = true;
    this.service.getArticles().subscribe({
      next: (res) => {
        this.articles = [...this.articles, ...res];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  loadNextPage() {
    this.service.articlesPage = this.service.currentPage + 1;
    // this.getArticles();
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }
}
