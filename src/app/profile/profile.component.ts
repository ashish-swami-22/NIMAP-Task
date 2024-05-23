import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe((data: any[]) => {
      this.user = data.length ? data[0] : null;
    });
  }

  onEdit() {
    this.router.navigate(['/register'], { state: { user: this.user } });
  }
}
