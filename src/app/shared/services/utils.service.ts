import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  public range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el: number) => el+start)
  }
}
