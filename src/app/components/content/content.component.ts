import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { APIResponseModel, IDashboardData } from '../../model/interface/role';
import { RolesService } from '../../services/roles.service';
import { SeriesLabelsContentArgs, ChartModule  } from "@progress/kendo-angular-charts";
import { EmployeeComponent } from '../employee/employee.component';
import { ProjectComponent } from '../project/project.component';
import { MeetingComponent } from '../meeting/meeting.component';
import { ClientComponent } from '../client/client.component';
import { PaymentsComponent } from '../payments/payments.component';
@Component({
  selector: 'app-content',
  imports: [CommonModule,CommonModule, EmployeeComponent, ProjectComponent, MeetingComponent, ChartModule, ClientComponent, PaymentsComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{

  @Input() selectedItem!: string;

  chartData: any[] = [];

  dashboardData : IDashboardData[] = [];

  dashboardDataService = inject(RolesService);

  getdashboarddata() {
    this.dashboardDataService.getDashboardData().subscribe((res: APIResponseModel)=> {
      this.dashboardData = res.data;
      if(this.dashboardData && this.dashboardData.length){
        const item = this.dashboardData[0];
        this.chartData = [
          {category: "Client", value: item.totalClient},
          {category: "Designation", value: item.totalDesignation},
          {category: "Employee", value: item.totalEmployee},
        ]
      }
      console.log(this.dashboardData,"dashboardData")
    })
  }

  public labelContent(e: SeriesLabelsContentArgs): string {
    console.log("call")
    // return e.category ?? 'hello';
    return `${e.category}: ${e.value}`;
  }

  ngOnInit(): void {
    this.getdashboarddata();
    
  }


}
