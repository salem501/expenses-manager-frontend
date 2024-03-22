import {Component} from '@angular/core';
import {animate, group, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('fadeInSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(+50%)' }),
        group([
          animate('0.5s ease-out', style({ opacity: 1 })),
          animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
        ])
      ])
    ])
  ]
})
export class LoginPageComponent {
  activeForm = false; //false: login, true: signup

  toggleActiveForm() {
    this.activeForm = !this.activeForm;
  }
}
