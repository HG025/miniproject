import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { APIResponseModel, iAllRoles } from '../../model/interface/role';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, LayoutModule, KENDO_GRID, KENDO_INPUTS],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  
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
