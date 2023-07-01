import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabItemInterface } from 'src/interfaces/TabItem.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() tabs: TabItemInterface[] = [];
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();
}
