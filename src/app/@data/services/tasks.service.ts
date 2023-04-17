import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ITask} from '@data/interfaces';
import { Task } from '@data/models/task';

@Injectable()
export class TasksService {
  constructor(
    private http: HttpClient,
  ) {
  }

  fetchTasks(): Observable<ITask[]> {
    return of(Array.from({ length: 2 }, Task.dummy_2));
  }

  findTaskById(id: number): Observable<ITask> {
    return this.http
      .get<{ json: () => any }>
      (`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        tap(res => console.log('Pure Res', res)),
        map(res => res.json()),
        tap(res => console.log('Parsed', res))
      );
  }

  createTask(newTaskTitle: string): Observable<ITask> {
    const dumpTask = new Task();

    dumpTask.id = crypto.randomUUID();
    dumpTask.title = newTaskTitle;
    dumpTask.completed = false;
    dumpTask.order = 0;

    return of(dumpTask as ITask);
  }
}
