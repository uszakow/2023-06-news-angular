import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/modules/user/components/login/login.component';
import { ProfileComponent } from 'src/app/modules/user/components/profile/profile.component';
import { ProfileDataChangeComponent } from 'src/app/modules/user/components/profile/profile-data-change/profile-data-change.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, ProfileDataChangeComponent],
  exports: [LoginComponent, ProfileComponent, ProfileDataChangeComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
