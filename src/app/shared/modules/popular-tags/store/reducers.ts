import {PopularTagsStateInterface} from "../types/popularTagsState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {ActionTypes} from "./actionTypes";
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from "./actions/getPopularTags.action";

const initialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null
}

const popularTagReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagReducer(state, action)
}
