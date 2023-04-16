import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import * as TasksAction from '../actions';
import {TasksService} from '@data/services/tasks.service';

@Injectable()
export class TasksEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksAction.load),
      exhaustMap(() =>
        this.taskService.fetchTasks().pipe(
          map(tasks => TasksAction.loaded({ tasks })),
          catchError(error => of(TasksAction.loadedFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksAction.createTask),
      exhaustMap(({ newTaskTitle }) => {
        return this.taskService.createTask(newTaskTitle).pipe(
          map(createdTask => TasksAction.createTaskSuccessful({ createdTask })),
          catchError(error => of(TasksAction.createTaskFailure({ error })))
        )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TasksService
  ) {
  }
}
