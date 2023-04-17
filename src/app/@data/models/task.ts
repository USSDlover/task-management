import {ITask} from '@data/interfaces';

export class Task implements Partial<ITask> {
  completed?: boolean;
  id?: string;
  order?: number;
  title?: string;

  static create(value: ITask): ITask {
    const task = new Task();
    return Object.assign(task, value);
  }

  static dummy(withId: boolean): Partial<ITask> {
    const dummyTask = new Task();

    dummyTask.completed = false;
    dummyTask.order = 0;
    dummyTask.title = 'Something good' + (new Date().getTime() / 100000);

    if (withId)
      dummyTask.id = crypto.randomUUID();

    return dummyTask;
  }

  static dummy_2(): ITask {
    const dummyTask = new Task();

    dummyTask.id = crypto.randomUUID();
    dummyTask.completed = (Math.floor(Math.random() * 10)) % 2 === 0;
    dummyTask.order = 0;
    dummyTask.title = 'Item - ' + Math.floor(Math.random() * 1000).toString();

    return dummyTask as ITask;
  }
}
