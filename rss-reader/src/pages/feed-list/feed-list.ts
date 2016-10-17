import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Http } from '@angular/http';
import {FeedService, FeedItem, Feed} from '../../providers/feed-service';

@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  selectedFeed: Feed;
  articles: FeedItem[];
  loading: Boolean;

  constructor(private nav: NavController, private feedService: FeedService, private navParams: NavParams) {
     this.selectedFeed = navParams.get('selectedFeed');
   }

   public ionViewWillEnter() {
       if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
         this.loadArticles()
       } else {
         this.feedService.getSavedFeeds().then(
           feeds => {
             if (feeds.length > 0) {
               let item = feeds[0];
               this.selectedFeed = new Feed(item.title, item.url);
               this.loadArticles();
             }
           }
         );
       }
     }

    public loadArticles() {
      this.loading = true;
      this.feedService.getArticlesForUrl(this.selectedFeed.url).subscribe(res => {
        this.articles = res;
        this.loading = false;
      });
    }

    public openArticle(url: string) {
      // InAppBrowser.open(url, '_blank');
      window.open(url, '_blank');
    }
}
