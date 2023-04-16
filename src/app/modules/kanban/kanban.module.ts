import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '@shared/shared.module';
import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './pages/kanban/kanban.component';

import {TaskComponent} from './components/task/task.component';
import { NewTaskComponent } from './components/new-task/new-task.component';


@NgModule({
  declarations: [KanbanComponent, TaskComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    NewTaskComponent
  ]
})
export class KanbanModule { }
