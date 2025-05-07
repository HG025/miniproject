'use strict';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { APIResponseModel } from '../../../model/interface/role';

@Component({
  selector: 'app-login',
  // standalone: true,
  imports: [ 
    CommonModule, LayoutModule ,RouterModule,FormsModule ,ReactiveFormsModule, TranslateModule
   ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public form!: FormGroup;

  constructor(
    private route: Router,
    private formbuilder: FormBuilder
  ) {
    this.form = this.formbuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  loginService = inject(LoginService);

  onLoginClick() {
    this.form.markAllAsTouched();
    this.route.navigate(['/dashboard']);

    if(this.form.invalid) {
      console.log("this is invalid Error")
    }
    const loginData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    // this.loginService.checkLogin(loginData).subscribe((res: APIResponseModel)=> {
    //   console.log("abc");
    // })

    this.loginService.checkLogin(loginData).subscribe({
      next: (res) => {
        if (res.result === true) {
          console.log('Login successful:', res);
          // this.route.navigate(['/dashboard']); 
        } else {
          alert('Login failed: ' + res.message);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('An error occurred during login.');
      }
    });

  }




}