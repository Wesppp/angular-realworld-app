import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PopularTagsStateInterface} from "../types/popularTagsState.interface";

export const popularTagsFeatureSelector = createFeatureSelector<
  PopularTagsStateInterface
  >('popularTags')

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagState: PopularTagsStateInterface) => popularTagState.data
)

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagState: PopularTagsStateInterface) => popularTagState.isLoading
)

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagState: PopularTagsStateInterface) => popularTagState.error
)
