import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomepageComponent {
  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
