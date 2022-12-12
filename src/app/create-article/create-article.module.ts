import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { RouterModule, Routes } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/article-form/article-form.module";
import { HttpClientModule } from "@angular/common/http";
import { CreateArticleService } from "./services/createArticle.service";
import { EffectsModule } from "@ngrx/effects";
import { CreateArticleEffect } from "./store/effects/createArticle.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";

const routes: Routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
]

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    HttpClientModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers )
  ],
  providers: [
    CreateArticleService
  ]
})
export class CreateArticleModule { }
