import { Component, inject, OnInit } from '@angular/core';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { APIResponseModel, iAllRoles } from '../../model/interface/role';
import { RolesService } from '../../services/roles.service';
import { CommonModule, NgFor } from '@angular/common';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { AppbarComponent } from "../appbar/appbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, LayoutModule, KENDO_GRID, KENDO_INPUTS, AppbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  rolesList: iAllRoles[] =[];

  rolesService = inject(RolesService);
  gridView!: any[];



  ngOnInit(): void {
    this.rolesService.getAllRole().subscribe((res: APIResponseModel)=>{
      this.rolesList = res.data;
      this.gridView = this.rolesList;
      console.log(this.rolesList,"rolesList")
      console.log(this.gridView,"gridView")
    })
  }





}


