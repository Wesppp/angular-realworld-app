import {EditArticleStateInterface} from "./types/editArticleState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  updateArticleAction,
  updateArticleSuccessAction,
  updateArticleFailureAction
} from "./actions/editArticle.action";
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction } from "./actions/getArticle.action";

const initialStateInterface: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false
}

const editArticleReducer = createReducer(
  initialStateInterface,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
)

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action)
}
