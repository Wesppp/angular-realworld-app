import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProfileInterface } from "../../../shared/types/profile.interface";
import { filter, map, Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getUserProfileAction } from "../../store/actions/getUserProfile.action";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { errorSelector, isLoadingSelector, userProfileSelector } from "../../store/selectors";
import { combineLatest } from "rxjs";
import { currentUserSelector } from "../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public userProfile!: ProfileInterface | null
  public userProfileSubscription!: Subscription
  public slug!: string
  public apiUrl!: string

  public isCurrentUserProfile$!: Observable<boolean>
  public isLoading$!: Observable<boolean>
  public error$!: Observable<string | null>

  constructor(private store: Store,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
      return currentUser.username === userProfile.username
    }))
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface | null) => {
        this.userProfile = userProfile
      })

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug} ))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }
}
