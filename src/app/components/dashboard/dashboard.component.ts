import { Component, inject, OnInit } from '@angular/core';
import { DrawerItem, DrawerSelectEvent, LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { APIResponseModel, iAllRoles } from '../../model/interface/role';
import { RolesService } from '../../services/roles.service';
import { CommonModule, NgFor } from '@angular/common';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { RouterModule } from '@angular/router';
import { IconsModule, SVGIcon } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ContentComponent } from '../content/content.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { envelopeLinkIcon, homeIcon, menuIcon, userIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule,
    CommonModule,
    LayoutModule,
    IconsModule,
    NavigationModule,
    ButtonsModule,
    ContentComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  public menuSvg: SVGIcon = menuIcon;
  public selected = 'dashboard';
  
  public items: Array<DrawerItem> = [
    {text: 'dashboard', svgIcon: homeIcon, selected: true},
    {separator: true},
    {text: 'employee', svgIcon: userIcon},
    {separator: true},
    {text: 'roles', svgIcon: envelopeLinkIcon, selected: true},
    {separator: true},
  ];

public onSelect(ev: DrawerSelectEvent): void {
  this.selected = ev.item.text;
  }
}


