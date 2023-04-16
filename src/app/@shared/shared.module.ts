import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '@shared/angular-material.module';

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  AngularMaterialModule
];

/**
 * Contains shared modules and shared components
 *
 * in case of services this module should consider as last solution to provide service
 */
@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  declarations: []
})
export class SharedModule {
}
