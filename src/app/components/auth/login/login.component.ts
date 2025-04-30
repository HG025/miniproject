import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
      email: new FormControl('',[Validators.required, Validators.email])
    })
  }



}