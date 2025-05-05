import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule, SVGIcon } from '@progress/kendo-angular-icons';
import { DrawerItem, DrawerSelectEvent, LayoutModule } from '@progress/kendo-angular-layout';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { bellIcon, envelopeLinkIcon, homeIcon, menuIcon } from '@progress/kendo-svg-icons';
import { ContentComponent } from "../content/content.component";


@Component({
  selector: 'app-appbar',
  imports: [
    RouterModule,
    CommonModule,
    LayoutModule,
    IconsModule,
    NavigationModule,
    ButtonsModule,
    ContentComponent
],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {

  public menuSvg: SVGIcon = menuIcon;
  public selected = 'register';
  
  public items: Array<DrawerItem> = [
    {text: 'register', svgIcon: homeIcon, selected: true},
    {separator: true},
    {text: 'login', svgIcon: envelopeLinkIcon},
    {separator: true}
  ];

public onSelect(ev: DrawerSelectEvent): void {
  this.selected = ev.item.text;
  }


}
