import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  task: any;
  lists: any;
  selectedListId!: string;


  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      if (params['listId']) {
        
           this.taskService.getTasks(params['listId']).subscribe((tasks: Task[] | unknown) => {
             this.task = tasks;
           })
      } else {
        this.task = undefined;
      }
    });
    // this.route.params.subscribe((params: Params) => {
    //     if (params['listId']) {
    //       this.selectedListId = params['listId'];
    //       this.taskService.getTasks(params['listId']).subscribe((tasks: Task[] | unknown) => {
    //         this.task = tasks;
    //       })
    //     } else {
    //       this.task = undefined;
    //     }
    //   }
    // )
    this.taskService.getData().subscribe((list: any) => {
      this.lists = list;
    });
  }


}
