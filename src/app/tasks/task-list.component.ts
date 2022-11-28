import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{ActivatedRoute, Route} from '@angular/router';
import { NewTask } from './new-task.dto';
import { TaskItem } from './task-item.dto';
import {TaskService} from './task.service';


@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  title = 'todo-list';
  constructor(private route: ActivatedRoute,
    private taskService: TaskService) { }

 // taskService = new TaskService(); don't need it because we include it in the constructor. 
  tasks = this.taskService.getAllTasks(this.route.snapshot.params['date']);
 
 // newTaskTitle: string = ""; 
  newTask: NewTask = new NewTask();
 
 
  //date: Date = new Date();
  ngOnInit(): void {
   // this.date = new Date(this.route.snapshot.params['date']);
   var strDate = this.route.snapshot.params['date'];
   this.newTask = new NewTask(this.newTask.title, new Date(strDate));
  }
  
  add( taskNgForm :NgForm){
    
    //we check if the user entered value. We don't want the user to submit an empty form. 
   // the add task is now in the taskservice. 
    this.taskService.addTask(this.newTask.date,this.newTask);
    
    if(taskNgForm.touched == false)
      return;     
    
    // we reset the form. Use the name attribute which is called "date". We set it to this.date. 
    taskNgForm.reset({date: this.newTask.date});
  }

  remove(existingTask: TaskItem){
    var userConfirmed = confirm(`Are you sure that you want to remove the following task? \n "${existingTask.title}"`)
  
    if(userConfirmed){
        this.taskService.removeTask(this.newTask.date,existingTask);
      
    }
  }
}


