import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'http';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  public name = '';
  selectedListId: string ='6565ad74891c2f85b31a41ed';

  constructor(private taskService:TaskService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.getdata();
  }
  createNewList(){
    this.taskService.createList(this.name).subscribe((response:any)=>{
      this.name = ""
      this.getdata();
    })
  }
  public data_api: any;
  public getdata(): void{
    this.taskService.getData().subscribe((data)=>{
        this.data_api=data
        console.log(this.data_api)
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      console.log(res);
    })
  }
}
