import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expenses-manager';

  router!: Router;

  constructor(router: Router) {
    this.router = router;
  }

  showApplicationView() {
    return !(this.router.url.includes('/login') || this.router.url.includes('/signup'))
  }
}
