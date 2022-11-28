import { Injectable } from '@angular/core';
import { TaskItem } from './task-item.dto';
import { NewTask } from './new-task.dto';
import {Observable, BehaviorSubject,tap, map} from 'rxjs';
import {HttpClient} from '@angular/common/http'; 

const resourceURL = 'http://localhost:3001/tasks'

@Injectable()

export class TaskService {

  constructor(private httpClient: HttpClient) { }
  
  private tasks = new BehaviorSubject<TaskItem[]>([])

  
getAllTasks(date: Date):  Observable<TaskItem[]>  {
   this.httpClient.get<TaskItem[]>(`${resourceURL}/${date}`)
  .pipe(tap(console.log))
  .pipe(map(TaskService.mapTaskItems))
  .pipe(tap(console.log))
  .subscribe(t=> this.tasks.next(t))

  return this.tasks
}

private static mapTaskItems(items: {title: string}[]){  
 // pass items which is of type  object {title:string}[] we map to a new Task class object 
  return items.map(item => new TaskItem(item.title));

}

addTask(date: Date,newTask: NewTask){
  
//  this.tasks.push(new TaskItem(newTask.title)) which gets replaced by concat to create new reference
// use concat to append to the array an create new instance 
var updatedTasks  = this.tasks.value.concat(new TaskItem(newTask.title));
this.httpClient.post(`${resourceURL}/${newTask.date}`,newTask)
.subscribe(() => this.tasks.next(updatedTasks)) 
// using next function will fire off an event emitter  all subscribers will listen to.

}

removeTask(date: Date,existingTask: TaskItem){
 var updatedTasks = this.tasks.value.filter(task => task != existingTask);
 this.httpClient.delete(`${resourceURL}/${date}/${existingTask.title}`)
 .subscribe(() => this.tasks.next(updatedTasks))

 }

}
