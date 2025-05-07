import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EmployeeComponent } from "../employee/employee.component";
import { RolesComponent } from "../roles/roles.component";
import { ProjectComponent } from "../project/project.component";
import { MeetingComponent } from "../meeting/meeting.component";

@Component({
  selector: 'app-content',
  imports: [CommonModule, EmployeeComponent, RolesComponent, ProjectComponent, MeetingComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  @Input() selectedItem!: string;
}
