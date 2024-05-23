import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup | undefined;
  interests: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]],
      age: [null, Validators.required],
      interest: [''],
      address: ['', Validators.required],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: ['']
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { user: any };
    if (state && state.user) {
      this.registerForm.patchValue(state.user);
      this.interests = state.user.interests;
    }
  }

  addInterest() {
    const interest = this.registerForm.get('interest').value;
    if (interest) {
      this.interests.push(interest);
      this.registerForm.get('interest').reset();
    }
  }

  removeInterest(index: number) {
    this.interests.splice(index, 1);
  }

  onAddressChange() {
    const address = this.registerForm.get('address').value;
    if (address === 'home') {
      this.registerForm.get('companyAddress1').reset();
      this.registerForm.get('companyAddress2').reset();
    } else if (address === 'company') {
      this.registerForm.get('address1').reset();
      this.registerForm.get('address2').reset();
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        interests: this.interests
      };
      this.userService.addUser(userData).subscribe(() => {
        this.router.navigate(['/profile']);
      });
    }
  }
}
