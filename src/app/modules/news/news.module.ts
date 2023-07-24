import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsAddComponent } from './components/news-list/news-add/news-add.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsManageModalComponent } from './components/news-list/news-manage-modal/news-manage-modal.component';
import { NewsPreviewComponent } from './components/news-list/news-preview/news-preview.component';
import { SharedModule } from '../shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailsComponent,
    NewsPreviewComponent,
    NewsManageModalComponent,
    NewsAddComponent,
  ],
  exports: [
    NewsListComponent,
    NewsDetailsComponent,
    NewsPreviewComponent,
    NewsManageModalComponent,
    NewsAddComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, SharedModule],
})
export class NewsModule {}
