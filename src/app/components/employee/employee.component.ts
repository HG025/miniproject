import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditEvent, ExcelService, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT } from '@progress/kendo-angular-grid';
import { Designation, employee, IDesignation, IEmployee, IRoles, Item, Roles } from '../../model/interface/employee';
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

  onClose() {
    console.log("close click")
    this.showEmployeeDialog = false;
    this.showDesignationDialog = false
    this.showRolesDialog = false
    this.designationObj = new Designation();
    this.rolesObj = new Roles();
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
    this.getAllDesignation();
    this.getAllRoles();
   
  }


  // designations

  public designationList : IDesignation[] = [];

  public designationObj: Designation = new Designation();

  public showDesignationDialog : boolean = false;

  public isNew : boolean = true;

  public selectedDesignation : any;

    getAllDesignation() {
    this.employeeService.getAllDesignation().subscribe((res:APIResponseModel)=>{
      this.designationList = res.data;

    })
    }

    onDesignationContextMenuSelect(event: any) {
      const selectedDesigItem = event.item.text;
     if(selectedDesigItem == "Edit Designation"){
         this.isNew = false
         this.showDesignationDialog = true
         this.editDesignation();
      }else if(selectedDesigItem == "Delete Designation"){
        this.deleteDesignation(event);

      } 
  }

  onAddDesignationSelect() {
      this.isNew = true
      this.showDesignationDialog = true
  }

    editDesignation(){
    const designationId = [{
    designationId: this.selectedDesignation.designationId,
    designation: this.selectedDesignation.designation
  }] 
    this.employeeService.addUpdateDesignation(designationId).subscribe((res:APIResponseModel)=>{
      res.data = designationId;
      if(res.result && res.data && res.data.length > 0 ){
        this.designationObj = res.data[0];
        console.log(this.designationObj,"this.designationObj")
      }
    })
  }

  onSubmitDesig() {
    this.employeeService.addUpdateDesignation([this.designationObj]).subscribe((res:APIResponseModel)=>{
      console.log(res,"res in submit")
    if(res.result){
      if(this.isNew){
        alert("Designation Created Successfully")
      }else {
        alert("Designation Updated Successfully")
      }
    }else {
      alert("Designation created/Updated Failed")
    }
    this.designationObj = new Designation();
    this.showDesignationDialog = false;
    this.getAllDesignation();
    })
  }

  deleteDesignation(designationId: number){
    designationId = this.selectedDesignation.designationId;
    const isDelete = "ARE YOU SURE YOU WANT TO DELETE??"
    this.employeeService.deleteDesignation(designationId).subscribe((res: APIResponseModel)=>{
      if(isDelete){
        alert("Designation ID: " + designationId + " delted successfully")
        this.getAllDesignation();
      }else {
        alert("Delete failed!");
      }
    })
  }


  onDesignationGridSelectionChange(event: any){
    if(event.selectedRow && event.selectedRow.length > 0){
      this.selectedDesignation = event.selectedRow[0].dataItem;
    }else {
      this.selectedDesignation = null;
    }
  }

  onClickForDesignContextMenu(event: MouseEvent){
    const tragetRow = (event.target as HTMLElement).closest('kendo-grid-list tr')
    if(tragetRow){
      const rowIndex = Array.from(tragetRow.parentElement!.children).indexOf(tragetRow);
      this.selectedDesignation = this.designationList[rowIndex]
    }
  }




  //roles


  
  public rolesList : IRoles[] = [];
  
  public rolesObj : Roles = new Roles();

  public showRolesDialog: boolean = false;

  public selectedRole: any;
  
  getAllRoles(){
    this.employeeService.getAllRole().subscribe((res: APIResponseModel)=>{
     this.rolesList = res.data;
    })
  }

  onSubmitRoles() {
    this.employeeService.addUpdateRoles([this.rolesObj]).subscribe((res: APIResponseModel)=>{
      if(res.result){
        if(this.isNew){
          alert("New Role Created Successfully")
        }else {
          alert("Role Updated Successfully!")
        }
      }else {
        alert("failed to create/update Role")
      }
      this.getAllRoles();
      this.rolesObj = new Roles();
      this.showRolesDialog = false;
    })
  }

  editRole() {
    const roleId = [{
      roleId: this.selectedRole.roleId,
      role: this.selectedRole.role}];
    this.employeeService.addUpdateRoles(roleId).subscribe((res: APIResponseModel)=>{
      res.data = roleId
      if(res.data){
        this.rolesObj = res.data[0];
      }
    })
  }

  deleteRole(roleId: number) {
    roleId = this.selectedRole.roleId
    const isDelete = "ARE YOU SURE YOU WANT TO DELETE?";
    this.employeeService.deleteRole(roleId).subscribe((res: APIResponseModel)=>{
       if(isDelete){
         alert("Deleted Successfully")
      }else {
        alert("Delete Failed")
      }
      this.getAllRoles();
    })
  }

  onRolesContextMenuSelect(event: any){
    const selectedRolesItem = event.item.text;

    if(selectedRolesItem == "Add Roles"){
      this.isNew = true
      this.showRolesDialog = true

    }else if(selectedRolesItem == "Edit Roles"){
       this.isNew = false
       this.showRolesDialog = true
       this.editRole();
    }else if(selectedRolesItem == "Delete Roles"){
      this.deleteRole(event);

    }
  }

  onRolesGridSelection(event: any){
    if(event.selectedRow && event.selectedRow.length > 0){
      this.selectedRole = event.selectedRow[0].dataItem;
    }else {
      this.selectedRole = null
    }
  }

  onClickForRolesContextMenu(event: MouseEvent){
    const targetRow = (event.target as HTMLElement).closest('kendo-grid-list tr');
    if(targetRow){
      const rowIndex = Array.from(targetRow.parentElement!.children).indexOf(targetRow);
      this.selectedRole = this.rolesList[rowIndex];
    }

  }
  








}
