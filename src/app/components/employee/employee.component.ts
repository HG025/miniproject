import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExcelService, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT } from '@progress/kendo-angular-grid';
import { employee, IEmployee, Item } from '../../model/interface/employee';
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
  public showEmployeeDialog: boolean = false;

  EmployeeObj: employee = new employee();


  // onSubmit() {
  //   console.log('Sending:', this.EmployeeObj);
  //   this.employeeService.addNewEmployee(this.EmployeeObj).subscribe((res:APIResponseModel)=> {
  //     if(res.result){
  //       alert("employee Added Successfully!!")
  //       this.getAllEmployees();
  //       this.EmployeeObj = new employee();
  //       this.showEmployeeDialog = false;
  //       console.log(res.data,"res.data")
  //       console.log(res.result,"res.result")
  //       console.log(res.message,"res.message")
  //       console.log(this.EmployeeObj,"this.EmployeeObj")
  //     }else {
        
  //       alert(res.message + "employee Not Created");
  //       console.log(res.data,"res.data fail")
  //       console.log(res.result,"res.result fail")
  //       console.log(res.message,"res.message fail")
  //       this.showEmployeeDialog = false;
  //     }
  //   })
  // }

  onSubmit() {
    console.log('Sending:', this.EmployeeObj);
    this.employeeService.addNewEmployee(this.EmployeeObj).subscribe({
      next: (res: APIResponseModel) => {
        if (res.result) {
          alert("Employee Added Successfully!!");
          this.getAllEmployees();
          this.EmployeeObj = new employee();
          this.showEmployeeDialog = false;
        } else {
          alert("Error: " + res.message);
        }
      },
      error: (err) => {
        console.error("Full error:", err);
        alert(err?.error?.message || "Unexpected error occurred");
      },
      // error: (err) => {
      //   console.error("HTTP error occurred:", err);
      //   alert("An unexpected error occurred. Please try again.");
      // }
    });
  }

  onClose(status: string): void {
    console.log("close click")
    this.showEmployeeDialog = false;
  }

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
  }

  onContextMenuSelect(event: any): void{
    const selectedText = event.item.text;
    if(selectedText === 'Add Employee'){
      this.showEmployeeDialog = true;
    }

  }


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
