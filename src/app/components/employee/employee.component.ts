import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExcelService, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT } from '@progress/kendo-angular-grid';
import { IEmployee } from '../../model/interface/employee';
import { EmployeeService } from '../../services/employee.service';
import { APIResponseModel } from '../../model/interface/role';
import { fileExcelIcon, filePdfIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { ContextMenuModule } from '@progress/kendo-angular-menu';


@Injectable({
  providedIn: 'root' // or leave this out if you're using a custom provider
})

@Component({
  selector: 'app-employee',
  imports: [KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, ContextMenuModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  public excelSvg: SVGIcon = fileExcelIcon;

  employeeList: IEmployee[] = [];

  employeeService = inject(EmployeeService);

  employeeData: any[] = [];

  getAllEmployees() {
    this.employeeService.getAllEmployee().subscribe((res:APIResponseModel)=> {
      this.employeeList = res.data;
      if(this.employeeList && this.employeeList.length){
        const item = this.employeeList[0]
        this.employeeData = [
          {
            empName: item.empName,
            empId: item.empId,
            empCode: item.empCode,
            empEmailId: item.empEmailId,
            empDesignation: item.empDesignation,
            role: item.role,

          }
        ]
        console.log( this.employeeData," this.employeeData")
      }
      console.log( this.employeeList," this.employeeList")
    })
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

}
