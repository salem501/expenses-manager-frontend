import { Component } from '@angular/core';
import {menuRoutes} from "../app-routing.module";
import {Router} from "@angular/router";
import {AuthService} from "../auth-service/auth.service";

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  protected readonly menuRoutes = menuRoutes;

  logout() {
    console.log(this.authService.userId)
    this.authService.logout();
  }
}
