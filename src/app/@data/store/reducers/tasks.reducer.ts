import {Action, createReducer, on} from '@ngrx/store';
import * as TaskActions from '../actions';
import {ITask} from '@data/interfaces';

export const initialState: State = [];

export type State = ITask[];

const _storeTodoReducer = createReducer(
  initialState,
  on(TaskActions.loaded, (state, action) => {
    return action.tasks;
  }),
  on(TaskActions.createTaskSuccessful, (state, { createdTask }) => {
    return [createdTask];
  })
);

export function tasksReducer(state: State | undefined, action: Action): ITask[] {
  return _storeTodoReducer(state, action);
}
