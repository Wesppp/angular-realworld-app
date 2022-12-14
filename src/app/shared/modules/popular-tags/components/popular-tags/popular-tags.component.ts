import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {getPopularTagsAction} from "../../store/actions/getPopularTags.action";
import {Observable} from "rxjs";
import {PopularTagType} from "../../../../types/popularTag.type";
import {errorSelector, isLoadingSelector, popularTagsSelector} from "../../store/selectors";

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {
  public popularTags$!: Observable<PopularTagType[] | null>
  public isLoading$!: Observable<boolean>
  public error$!: Observable<string | null>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction())
  }

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
}
