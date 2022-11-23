import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss']
})
export class GlobalFeedComponent implements OnInit {

  public apiUrl: string = '/articles'

  constructor() { }

  ngOnInit(): void {
  }

}
