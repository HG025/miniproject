import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EmployeeComponent } from "../employee/employee.component";
import { RolesComponent } from "../roles/roles.component";
import { ChartsModule, SeriesLabelsContentArgs } from "@progress/kendo-angular-charts";
import { APIResponseModel, IDashboardData } from '../../model/interface/role';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-content',
  imports: [CommonModule, EmployeeComponent, RolesComponent, ChartsModule],
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
