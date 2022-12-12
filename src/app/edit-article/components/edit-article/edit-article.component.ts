import { Component, OnInit } from '@angular/core';
import { ArticleInputInterface } from "../../../shared/types/articleInput.interface";
import {filter, map, Observable} from "rxjs";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { select, Store } from "@ngrx/store";
import {articleSelector, isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import { updateArticleAction } from "../../store/actions/editArticle.action";
import { ActivatedRoute } from "@angular/router";
import { getArticleAction } from "../../store/actions/getArticle.action";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  public slug!: string

  public isSubmitting$!: Observable<boolean | null>
  public isLoading$!: Observable<boolean>
  public initialValues$!: Observable<ArticleInputInterface>
  public backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private store: Store,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }))
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      })
    )
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ articleInput, slug: this.slug }))
  }
}
