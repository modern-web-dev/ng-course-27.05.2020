import {Component} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  changingDialog$;

  constructor(router: Router) {
    this.changingDialog$ = router.events
      .pipe(
        filter((e: RouterEvent) => e instanceof NavigationStart ||
          e instanceof NavigationEnd || e instanceof NavigationError),
        map((e: RouterEvent) => e instanceof NavigationStart)
      );
  }
}
