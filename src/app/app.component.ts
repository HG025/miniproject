import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [NgbNavConfig] 
})

export class AppComponent implements OnInit{
  title = 'miniproject';

  constructor(
    translate: TranslateService
  ){
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    console.log("app.component.ts file")
  }
}
