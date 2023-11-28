import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService :WebRequestService) { }
  
  createList(title:string){
    return  this.webReqService.post('lists',{title})
  }

  getData(){
    return  this.webReqService.get('lists')
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

    
    // get<any>(url , this.httpOptions);
}


