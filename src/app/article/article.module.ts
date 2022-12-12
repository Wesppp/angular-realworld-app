import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { RouterModule, Routes } from "@angular/router";
import { ErrorMessageModule } from "../shared/modules/error-message/error-message.module";
import { LoadingModule } from "../shared/modules/loading/loading.module";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { TagListModule } from "../shared/modules/tag-list/tag-list.module";
import { ArticleService } from "./services/article.service";
import { DeleteArticleEffect } from "./store/effects/deleteArticle.effect";

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule
  ],
  exports: [],
  providers: [SharedArticleService, ArticleService]
})
export class ArticleModule {
}
