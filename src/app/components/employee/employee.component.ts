import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExcelService, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT } from '@progress/kendo-angular-grid';
import { employee, IEmployee, Item, mockEmployees } from '../../model/interface/employee';
import { EmployeeService } from '../../services/employee.service';
import { APIResponseModel } from '../../model/interface/role';
import { fileExcelIcon, filePdfIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { FormControl, FormsModule } from '@angular/forms';
import { KENDO_LABELS } from "@progress/kendo-angular-label";


@Injectable({
  providedIn: 'root' // or leave this out if you're using a custom provider
})

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, ContextMenuModule, KENDO_DIALOG, TranslateModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS, FormsModule,CommonModule, KENDO_LABELS],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  // constructor(private ref : ChangeDetectorRef) {}

  public excelSvg: SVGIcon = fileExcelIcon;

  employeeList: IEmployee[] = [];

  employeeService = inject(EmployeeService);

  employeeData: any[] = [];

  erpdata: employee[] = [];
  
  public selectedOption = 'fresher';


    dropdownOptions: Array<Item> = [
    { text: 'fresher', value: 'fresher' },
    { text: 'ErpEmployeeSkills', value: 'skills' },
    { text: 'ErmEmpExperiences', value: 'experience' }
  ];

  
  onSelectedValueChange(selectedValue: any): void {
    console.log('New selected value:', selectedValue);
    this.selectedOption = selectedValue;
    // this.ref.detectChanges();

  }



  getAllEmployees() {
    this.erpdata = mockEmployees;
    console.log(this.erpdata,"erpdata")
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
