import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth-service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'expenses-manager';

  constructor(private router: Router,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.loadToken();
  }

  showApplicationView() {
    return !(this.router.url.includes('/login') || this.router.url.includes('/signup'))
  }
}
