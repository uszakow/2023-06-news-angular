import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-news-manage-modal',
  templateUrl: './news-manage-modal.component.html',
  styleUrls: ['./news-manage-modal.component.scss'],
})
export class NewsManageModalComponent {
  @Input() isOpen = false;
  @Input() modalTitle = '';
  @Input() newsTitle = '';
  @Input() newsContent = '';
  @Input() loading = false;
  @Input() error: string | string[] = '';
  @Output() changeNewsTitle = new EventEmitter<string>();
  @Output() changeNewsContent = new EventEmitter<string>();
  @Output() manageNews = new EventEmitter();
  @Output() closeModal = new EventEmitter();
}
