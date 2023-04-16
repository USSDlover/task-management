import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ITask} from '@data/interfaces';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

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
    private store: Store<{ tasks: ITask[] }>
  ) {
  }

  public ngOnDestroy(): void {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.getTasks();
    this.store.dispatch({ type: '[Tasks API] Load Tasks' });
  }

  private getTasks(): void {
    this.tasksSub = this.store
      .select(state => {
        return state.tasks;
      })
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
    // const item = event.previousContainer.data[event.previousIndex];
    transferArrayItem<ITask>(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}
