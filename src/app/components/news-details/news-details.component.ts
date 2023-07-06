import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { StateService } from 'src/app/services/state.service';
import { NewsInterface } from 'src/interfaces/News.interface';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  news: NewsInterface;
  content = [''];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private titleService: Title,
    public stateService: StateService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('newsId') || '';

    this.stateService.loading$.subscribe((loading) => {
      this.loading = loading;
      this.cd.detectChanges();
    });

    this.stateService.updateLoading(true);
    this.newsService
      .getNews(newsId)
      .pipe(
        finalize(() => {
          this.stateService.updateLoading(false);
        })
      )
      .subscribe((news) => {
        this.titleService.setTitle(news?.title || 'News app');
        this.news = news;
        this.content = news?.content.split('\n');
      });
  }
}
