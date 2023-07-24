import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { finalize } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { StateService } from 'src/app/services/state.service';
import { NewsInterface } from 'src/interfaces/News.interface';
import { UpdateNewsDto } from 'src/interfaces/UpdateNews.dto';
import { UserInterface } from 'src/interfaces/User.interface';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.scss'],
})
export class NewsPreviewComponent implements OnInit, OnChanges {
  @Input() news: NewsInterface;
  @Output() newsChange = new EventEmitter();

  user: UserInterface | null;
  content = [''];
  isEditNewsModalOpen = false;
  isDeleteNewsModalOpen = false;
  updatedNewsTitle = '';
  updatedNewsContent = '';

  loading = false;
  error: string | string[] = '';

  constructor(
    private stateService: StateService,
    private newsService: NewsService
  ) {}

  updateNews(): void {
    const body: UpdateNewsDto = {
      title: this.updatedNewsTitle,
      content: this.updatedNewsContent,
    };

    const token = this.stateService.getToken();
    if (token) {
      this.loading = true;
      this.newsService
        .updateNews(this.news.id, body, token)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this.newsChange.emit();
            this.isEditNewsModalOpen = false;
          },
          error: (error: HttpErrorResponse) => {
            this.error =
              error.error?.message || 'Nie udało się zaktualizować wiadomość.';
          },
        });
    }
  }

  deleteNews(): void {
    const token = this.stateService.getToken();
    if (token) {
      this.loading = true;
      this.newsService
        .deleteNews(this.news.id, token)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this.newsChange.emit();
            this.isDeleteNewsModalOpen = false;
          },
          error: (error: HttpErrorResponse) => {
            this.error =
              error.error?.message || 'Nie udałos się usunąć wiadomość.';
          },
        });
    }
  }

  closeEditNewsModal(): void {
    this.error = '';
    this.updatedNewsTitle = this.news.title;
    this.updatedNewsContent = this.news.content;
    this.isEditNewsModalOpen = false;
  }

  closeDeleteNewsModal(): void {
    this.error = '';
    this.isDeleteNewsModalOpen = false;
  }

  ngOnInit(): void {
    this.stateService.user$.subscribe((user) => {
      this.user = user;
    });

    this.updatedNewsTitle = this.news.title;
    this.updatedNewsContent = this.news.content;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.news && changes.news.currentValue) {
      const splittedContent = this.news.content.split('\n');

      this.content = splittedContent;
    }
  }
}
