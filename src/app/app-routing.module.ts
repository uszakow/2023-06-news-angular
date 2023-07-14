import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { NewsDetailsComponent } from './modules/news/components/news-details/news-details.component';
import { NewsListComponent } from './modules/news/components/news-list/news-list.component';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';
import { ProfileComponent } from './modules/user/components/profile/profile.component';

const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'news', redirectTo: '', pathMatch: 'full' },
  { path: 'news/:newsId', component: NewsDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
