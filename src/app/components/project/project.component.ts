import { Component, HostListener, inject, OnInit } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_GRIDLAYOUT, KENDO_TABSTRIP } from '@progress/kendo-angular-layout';
import { ProjectService } from '../../services/project.service';
import { APIResponseModel } from '../../model/interface/role';
import { Project, ProjectChanges } from '../../model/class/project';
import { IProject, IProject2, IProjectChanges } from '../../model/interface/project';
import { KENDO_CONTEXTMENU } from '@progress/kendo-angular-menu';
import { KENDO_DIALOG, KENDO_DIALOGS } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
import { distinct } from 'rxjs';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-project',
  imports: [KENDO_GRID, KENDO_GRIDLAYOUT, KENDO_CONTEXTMENU, KENDO_DIALOG, TranslateModule, CommonModule, ReactiveFormsModule, FormsModule, 
    KENDO_TABSTRIP, KENDO_DROPDOWNLIST, KENDO_LABEL, KENDO_INPUTS, KENDO_DIALOGS],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  projectService = inject(ProjectService);

  projectObj : Project = new Project();

  projectList : IProject[] = [];

  filteredProjectList : IProject2[] = [];

  public showProjectDialog: boolean = false;

  public showProjectFilterDialog: boolean = false;

  public isNew: boolean = true;

  public filteredDialog: boolean = false;

  // public defaultItem: string = 'Select...'; 

  public uniqueProjectList: any[] = [];

  public datVal : string = '';

  public selectedEmpId: number = 0;

  public selectedClientId: number = 0;

  public selectedProjectId: number = 0;

  public windowHeight: number = window.innerHeight;

  public windowWidth: number = window.innerWidth;


  public filterOptions: Array<string> = [
    "Filter By Employee ID",
    "Filter By Client ID",
    "Filter By Project ID"
  ]

  public selectedFilter: string = '';

  getAllProject() {
    this.projectService.getAllProjects().subscribe((res:APIResponseModel)=>{
      this.projectList = res.data;
      // this.showProjectDialog = true
      this.showProjectFilterDialog = true;
    })
  }

  getProjectLeadByEmpId(selectedEmpId: number){
    this.projectService.getProjectLeadByEmpId(selectedEmpId).subscribe((res:APIResponseModel)=>{
      this.showProjectFilterDialog = false;
     this.filteredProjectList = res.data;
     console.log(res.data,"res.data1")
    })
  }

  getProjectByClientId(selectedClientId: number){
    this.projectService.getProjectByClientId(selectedClientId).subscribe((res:APIResponseModel)=>{
      res.data;
      console.log(res.data,"res data for client")
    })
  }

  getProjectByProjId(selectedProjectId: number){
    this.projectService.getProjectByProjId(selectedProjectId).subscribe((res:APIResponseModel)=>{
      this.showProjectFilterDialog = false;
      const item = res.data;
      this.filteredProjectList = [
        {
          clientId: item.clientId,
          clientProjectId: item.clientProjectId,
          completedDate: item.completedDate,
          contactPerson: item.contactPerson,
          contactPersonContactNo: item.contactPersonContactNo,
          contactPersonEmailId: item.contactPersonEmailId,
          expectedEndDate: item.expectedEndDate,
          leadByEmpId: item.leadByEmpId,
          projectCost: item.projectCost,
          projectDetails: item.projectDetails,
          projectName: item.projectName,
          startDate: item.startDate,
          totalEmpWorking: item.totalEmpWorking
        }
      ]
      console.log(res.data,"res.data")
    })
  }


  onClose() {
    this.showProjectDialog = false;
    this.showProjectFilterDialog = false;
    this.filteredDialog = false;
    this.showProjectChangeDialog = false;
  }

  onSubmit(){
    this.projectService.addupdateProject().subscribe((res:APIResponseModel)=>{
     if(res.result){
      if(this.isNew){
        this.showProjectDialog = false;
        alert('Project Created Succesfully!')
      }else {
        this.showProjectDialog = false;
        alert('Failed to create Project')
      }
      
     }
    })
  }

  onTabSelect(event: any){

  }

  onWindowSize() {
    this.windowHeight = window.innerHeight - 10;
    this.windowWidth = window.innerWidth - 10;
  }

  onContextMenuSelect(event: any) {}

  onFilterSubmit(){
    this.onWindowSize();
    this.filteredDialog = true
    this.getProjectLeadByEmpId(this.selectedEmpId);
    this.getProjectByClientId(this.selectedClientId);
    this.getProjectByProjId(this.selectedProjectId);
  }
  



  ngOnInit(): void {
    this.getAllProject();
    this.getAllProjectChanges();
    
    this.onWindowSize();

    console.log(this.datVal,"datVal")
  }





  // project changes 

  public projectChangeList: IProjectChanges[] = [];

  public projectChangeObj: ProjectChanges = new ProjectChanges();

  public showProjectChangeDialog: boolean = false;



  getAllProjectChanges() {
    this.projectService.getAllProjectChanges().subscribe((res: APIResponseModel)=>{
      this.projectChangeList = res.data;
    })
  }

}
