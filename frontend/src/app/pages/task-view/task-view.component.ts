import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from 'src/app/Model/list.model';
import { Task } from 'src/app/Model/task.model';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists!: List[] ;
  tasks!: Task[] | undefined;
  // lists!: any ;
  // tasks!: any ;
  selectedListId!: string;
  isCreateButtonEnabled: boolean = true;
  constructor(private taskService: TaskService, private route: ActivatedRoute) {}
  
  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }
  

  ngOnInit() {
    //
    this.route.params.subscribe((params:Params) =>{
      if (params['listId']) {
        this.selectedListId = params['listId'];
           this.taskService.getTasks(params['listId']).subscribe((tasks: Task[] | unknown) => {
             this.tasks = tasks as Task[];
             console.log(this.tasks)
           })
      } else {
        this.tasks = undefined;
      }
    });
    
    
    //task get
    this.taskService.getData().subscribe((list: any) => {
      this.lists = list;
    });
  }
  

}
