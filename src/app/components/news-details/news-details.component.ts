import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { NewsInterface } from 'src/interfaces/News.interface';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  news: NewsInterface;
  content = [''];

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('newsId') || '';

    this.newsService.getNews(newsId).subscribe((news) => {
      this.titleService.setTitle(news?.title || 'News app');
      this.news = news;
      this.content = news?.content.split('\n');
    });
  }
}
