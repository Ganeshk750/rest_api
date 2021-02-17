import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'front-end';
  mediaSub: Subscription;
  deviceXs: boolean;
  
  constructor(public _mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.mediaSub = this._mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true: false;
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
