import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from "./shared/modules/top-bar/top-bar.module";
import { PersistanceService } from "./shared/services/persistance.service";
import { AuthInterceptor } from "./shared/services/authinterceptor.service";
import { GlobalFeedModule } from "./globalFeed/global-feed.module";
import { YourFeedModule } from "./yourFeed/your-feed.module";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { TagFeedModule } from "./tagFeed/tag-feed.module";
import { ArticleModule } from "./article/article.module";
import { CreateArticleModule } from "./create-article/create-article.module";
import { EditArticleModule } from "./edit-article/edit-article.module";
import { SettingsModule } from "./settings/settings.module";
import { UserProfileModule } from "./user-profile/user-profile.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    HttpClientModule,
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    StoreRouterConnectingModule.forRoot(),
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
