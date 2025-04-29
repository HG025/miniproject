import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DateInputsModule, KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KENDO_DATEINPUTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'miniproject';
}
