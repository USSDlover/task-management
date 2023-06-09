import * as fromTasks from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  tasks: fromTasks.TasksState;
}

export const selectTaskState = createFeatureSelector<fromTasks.TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  fromTasks.selectAllTasks
);

export const selectAllTodo = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => (!task.completed))
);

export const selectAllDone = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => (task.completed))
);
