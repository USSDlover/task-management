import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions';
import { ITask } from '@data/interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const adapter: EntityAdapter<ITask> = createEntityAdapter<ITask>();

export interface TasksState extends EntityState<ITask> {
}

export const initialState: TasksState = adapter.getInitialState();

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.loaded, (state, {tasks}) => {
    return adapter.addMany(tasks, state);
  }),
  on(TaskActions.createTaskSuccessful, (state, {createdTask}) => {
    return adapter.addOne(createdTask, state);
  }),
  on(TaskActions.updateTask, (state, {update}) => {
    return adapter.updateOne(update, state);
  })
);

const {selectAll} = adapter.getSelectors();

export const selectAllTasks = selectAll;
