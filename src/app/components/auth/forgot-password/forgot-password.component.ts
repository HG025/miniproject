import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, LayoutModule ,RouterModule,FormsModule ,ReactiveFormsModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent{

  public form!: FormGroup;

  constructor (
    private formbuilder: FormBuilder
  ){
    this.form = this.formbuilder.group({
      email: new FormControl('',[Validators.required, Validators.email])
    })
  }

}
