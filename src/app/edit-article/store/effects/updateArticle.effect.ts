import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UpdateArticleService } from "../../services/updateArticle.service";
import {
  updateArticleSuccessAction,
  updateArticleAction,
  updateArticleFailureAction
} from "../actions/editArticle.action";
import { ArticleInterface } from "../../../shared/types/article.interface";

@Injectable()
export class UpdateArticleEffect {

  constructor(private actions$: Actions,
              private updateArticleService: UpdateArticleService,
              private router: Router) {}

  updateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),
    switchMap(({ articleInput, slug }) => {
      return this.updateArticleService.updateArticle(slug, articleInput).pipe(
        map((article: ArticleInterface) => {
          return updateArticleSuccessAction({ article })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateArticleFailureAction({errors: errorResponse.error.errors}))
        })
      )
    })
  ))

  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
      ofType(updateArticleSuccessAction),
      tap(({ article }) => {
        this.router.navigate(['/articles', article.slug])
      })
    ),
    {dispatch: false}
  )
}
