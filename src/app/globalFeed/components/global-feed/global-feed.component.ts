import { Component } from '@angular/core';

@Component({
  selector: 'app-your-article',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss']
})
export class GlobalFeedComponent {
  public apiUrl: string = '/articles'
}
