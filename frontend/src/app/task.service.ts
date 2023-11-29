import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { Task } from './Model/task.model'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService :WebRequestService) { }
  
  createList(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('lists', { title });
  }

  getData(){
    return  this.webReqService.get('lists')
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }
  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
    // get<any>(url , this.httpOptions);
  createTask(title: string,listId:string) {
    // We want to send a web request to create a list
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}



