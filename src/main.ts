/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode, mergeApplicationConfig } from '@angular/core';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

// bootstrapApplication(AppComponent, 
//   {
//     providers: [provideAnimations()]
//   },appConfig)
//   .catch((err) => console.error(err));


  bootstrapApplication(AppComponent, 
    mergeApplicationConfig(appConfig, {
      providers: [provideAnimations()]
    }))
    .catch((err) => console.error(err));