import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import {  Task  }         from '../../Model/task.model'
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId! :string;
  isCreateButtonEnabled: boolean = false;
  constructor(private taskService:TaskService , private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.listId = params['listId'];
    });
  }
  onInputChange(value: string) {
    this.isCreateButtonEnabled = value.trim() !== '';
  }
  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe(
      next => {
        const newTask: Task = next as Task;
          console.log(newTask._id)
          this.router.navigate(['/lists',this.listId], { relativeTo: this.route.root });
      }
    )
  }
  backList(){
    this.router.navigate(['/lists',this.listId])
  }
}
