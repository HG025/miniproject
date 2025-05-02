import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule, SVGIcon } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bellIcon, menuIcon } from '@progress/kendo-svg-icons';


@Component({
  selector: 'app-appbar',
  imports: [
    RouterModule,
    CommonModule,
    LayoutModule,
    
    IconsModule,
    NavigationModule,
    ButtonsModule,],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {

  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public kendokaAvatar = 'https://demos.telerik.com/kendo-angular-ui/assets/navigation/appbar/kendoka-angular.png';

}
