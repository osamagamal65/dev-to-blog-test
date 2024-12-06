import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/base-response.interface';

@Injectable()
export class ArticlesService {
  private baseUrl = 'https://dev.to/api/articles';
  private paginationOptions = { page: 1, perPage: 20, query: '' };

  constructor(private http: HttpClient) { }

  get currentPage() {
    return this.paginationOptions.page;
  }

  set articlesPage(page: number) {
    this.paginationOptions = { ...this.paginationOptions, page };
  }

  set perPage(perPage: number) {
    this.paginationOptions = { ...this.paginationOptions, perPage: perPage };
  }

  set query(q: string) {
    this.paginationOptions = { ...this.paginationOptions, query: q};

  }

  get buildListingQuery(): string {
    return `page=${this.paginationOptions.page}&per_page=${this.paginationOptions.perPage}`;
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}?${this.buildListingQuery}${this.paginationOptions.query.length ? '&q' : ''}`);
  }

  getArticleById(articleId: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${articleId}`);
  }

}
