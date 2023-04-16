import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

const AngularMaterials = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
];

const AngularCdk = [
  DragDropModule
];

@NgModule({
  imports: [...AngularMaterials, ...AngularCdk],
  exports: [...AngularMaterials, ...AngularCdk]
})
export class AngularMaterialModule {
}
