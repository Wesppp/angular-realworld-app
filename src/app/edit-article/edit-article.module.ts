import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { RouterModule, Routes } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/article-form/article-form.module";
import { HttpClientModule } from "@angular/common/http";
import { UpdateArticleService } from "./services/updateArticle.service";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { UpdateArticleEffect } from "./store/effects/updateArticle.effect";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import {LoadingModule} from "../shared/modules/loading/loading.module";

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
]

@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    HttpClientModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule
  ],
  providers: [
    UpdateArticleService,
    SharedArticleService
  ]
})
export class EditArticleModule { }
