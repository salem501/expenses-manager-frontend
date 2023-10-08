import { Component } from '@angular/core';
import {routes} from "../app-routing.module";
import {Router} from "@angular/router";
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {

  constructor(
    private router: Router
  ) {
  }

  protected readonly routes = routes;

}
