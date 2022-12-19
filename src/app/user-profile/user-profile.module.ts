import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule } from "@angular/common/http";
import { UserProfileService } from "./services/user-profile.service";
import { EffectsModule } from "@ngrx/effects";
import { GetUserProfileEffect } from "./store/effects/getUserProfile.effect";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {FeedModule} from "../shared/modules/feed/feed.module";

const routes: Routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent
  }
]

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule
  ],
  providers: [
    UserProfileService
  ]
})
export class UserProfileModule { }
