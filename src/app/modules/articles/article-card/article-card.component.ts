import { Component, Input } from '@angular/core';
import { Article } from '../../../interfaces/base-response.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {

  @Input({ required: true })
  article!: Article;
}
