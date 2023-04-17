import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '@data/interfaces';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as TasksAction from '@data/store/actions';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../../components/new-task/new-task.component';
import { Update } from '@ngrx/entity';
import { selectAllTasks, State } from '@data/store';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit, OnDestroy {
  public todo: ITask[] = [];
  public done: ITask[] = [];
  private tasksSub?: Subscription;

  constructor(
    private store: Store<State>,
    public dialog: MatDialog
  ) {
  }

  public ngOnDestroy(): void {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.getTasks();
    this.store.dispatch({ type: TasksAction.load.type });
  }

  private getTasks(): void {
    this.tasksSub = this.store
      .pipe(select(selectAllTasks))
      .subscribe(tasks => {
        if (tasks.length > 0) {
          for (const task of tasks) {
            if (task.completed) {
              this.done.push(task);
            } else {
              this.todo.push(task);
            }
          }
        }
      });
  }

  public drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray<ITask>(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      return;
    }

    const item = event.previousContainer.data[event.previousIndex];
    const taskUpdate: Update<ITask> = {
      id: item.id,
      changes: { completed: event.container.id === 'done' }
    }
    this.store.dispatch(TasksAction.updateTask({ update: taskUpdate }))

    transferArrayItem<ITask>(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  public onAddTask(): void {
    const newTaskDialogRef = this.dialog.open(NewTaskComponent);
    newTaskDialogRef.afterClosed()
      .subscribe(newTaskTitle => {
        if (!!newTaskTitle)
          this.store.dispatch({ type: TasksAction.createTask.type, newTaskTitle });
      });
  }

}
