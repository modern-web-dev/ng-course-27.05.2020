import {Component} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showOrHide$;

  constructor(router: Router) {
    this.showOrHide$ = router.events
      .pipe(
        onlyStartAndEndNavigation(),
        showOnNavigationStartAndHideOnNavigationEnd()
      );
  }
}

function showOnNavigationStartAndHideOnNavigationEnd() {
  return map<RouterEvent, boolean>((e: RouterEvent) => e instanceof NavigationStart);
}

function onlyStartAndEndNavigation() {
  return filter<RouterEvent>((e: RouterEvent) => e instanceof NavigationStart ||
    e instanceof NavigationEnd || e instanceof NavigationError);
}
