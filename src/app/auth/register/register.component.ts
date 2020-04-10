import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { from } from 'rxjs';
import { throws } from 'assert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public route: Router
  ) {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
   }

  ngOnInit(): void {
  }

  registerUser(){
    this.authService.registerUser(this.signupForm.value).subscribe((res) => {
      if (res.result){
        this.signupForm.reset();
        this.route.navigate(['index']);
      }
    });
  }
}
