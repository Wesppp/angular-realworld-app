import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from "../actions/getUserProfile.action";
import { UserProfileService } from "../../services/user-profile.service";
import { ProfileInterface } from "../../../shared/types/profile.interface";

@Injectable()
export class GetUserProfileEffect {

  constructor(private actions$: Actions,
              private userProfileService: UserProfileService) {}

  getUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getUserProfileAction),
    switchMap(({ slug }) => {
      return this.userProfileService.getUserProfile(slug).pipe(
        map((userProfile: ProfileInterface) => {
          return getUserProfileSuccessAction({ userProfile })
        }),
        catchError(() => {
          return of(getUserProfileFailureAction())
        })
      )
    })
  ))
}
