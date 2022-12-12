import { Component } from '@angular/core';

@Component({
  selector: 'app-your-article',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss']
})
export class YourFeedComponent {
  public apiUrl: string = '/articles/article'
}
