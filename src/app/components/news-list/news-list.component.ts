import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NewsService } from 'src/app/services/news.service';
import { StateService } from 'src/app/services/state.service';
import { NewsInterface } from 'src/interfaces/News.interface';
import { UserInterface } from 'src/interfaces/User.interface';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit {
  news: NewsInterface[] = [];
  user: UserInterface | null;

  constructor(
    private titleService: Title,
    private stateService: StateService,
    private newsService: NewsService
  ) {}

  getNewsList(): void {
    this.newsService.getNewsList().subscribe({
      next: (newsList: NewsInterface[]) => {
        this.news = [...newsList];
      },
      error: (error) => {
        console.error(`ERROR:${error}`);
      },
    });
  }

  trackByNewsId(_: number, news: NewsInterface): string {
    return news.id;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Wiadomości');

    this.getNewsList();

    this.stateService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
