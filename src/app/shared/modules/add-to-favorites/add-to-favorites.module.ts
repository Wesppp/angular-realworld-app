import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component';
import { HttpClientModule } from "@angular/common/http";
import { AddToFavoritesService } from "./services/add-to-favorites.service";
import { EffectsModule } from "@ngrx/effects";
import { AddToFavoriteEffect } from "./store/effects/addToFavorite.effect";


@NgModule({
  declarations: [
    AddToFavoritesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([AddToFavoriteEffect])
  ],
  exports: [
    AddToFavoritesComponent
  ],
  providers: [
    AddToFavoritesService
  ]
})
export class AddToFavoritesModule { }
