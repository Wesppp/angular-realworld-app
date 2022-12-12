import { Component, OnInit } from '@angular/core';
import {ArticleInputInterface} from "../../../shared/types/articleInput.interface";
import {Observable} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {createArticleAction} from "../../store/actions/createArticle.action";

@Component({
  selector: 'app-edit-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  public isSubmitting$!: Observable<boolean | null>
  public backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    console.log(articleInput)
    this.store.dispatch(createArticleAction({ articleInput }))
  }
}
