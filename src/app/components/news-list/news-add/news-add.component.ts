import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { StateService } from 'src/app/services/state.service';
import { NewsDto } from 'src/interfaces/News.dto';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
})
export class NewsAddComponent {
  @Output() newsChange = new EventEmitter();

  isModalOpen = false;
  newsTitle = '';
  newsContent = '';
  loading = false;
  error: string | string[] = '';

  constructor(
    private stateService: StateService,
    private newsService: NewsService
  ) {}

  createNews(): void {
    const body: NewsDto = {
      title: this.newsTitle,
      content: this.newsContent,
    };

    const token = this.stateService.getToken();
    if (token) {
      this.loading = true;
      this.newsService
        .createNews(body, token)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this.newsChange.emit();

            this.newsTitle = '';
            this.newsContent = '';
            this.isModalOpen = false;
          },
          error: (error: HttpErrorResponse) => {
            this.error =
              error.error?.message || 'Nie udało się stworzyć wiadomość.';
          },
        });
    }
  }

  closeModal(): void {
    this.error = '';
    this.isModalOpen = false;
  }
}
