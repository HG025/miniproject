import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-content',
  imports: [CommonModule, DashboardComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  @Input() selectedItem!: string;
}
