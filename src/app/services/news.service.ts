import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NewsDto } from 'src/interfaces/News.dto';
import { Observable } from 'rxjs';
import { NewsInterface } from 'src/interfaces/News.interface';
import { UpdateNewsDto } from 'src/interfaces/UpdateNews.dto';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private apiService: ApiService) {}

  createNews(body: NewsDto, token: string): Observable<void> {
    return this.apiService.post('news', body, token);
  }

  getNewsList(): Observable<NewsInterface[]> {
    return this.apiService.get('news');
  }

  getNews(newsId: string): Observable<NewsInterface> {
    return this.apiService.get(`news/${newsId}`);
  }

  updateNews(
    newsId: string,
    body: UpdateNewsDto,
    token: string
  ): Observable<void> {
    return this.apiService.put(`news/${newsId}`, body, token);
  }

  deleteNews(newsId: string, token: string): Observable<void> {
    return this.apiService.delete(`news/${newsId}`, token);
  }
}
