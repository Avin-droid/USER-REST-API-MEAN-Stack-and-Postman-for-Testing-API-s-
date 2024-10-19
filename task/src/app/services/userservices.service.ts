import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user1';
import { Login1 } from '../interfaces/login1';
import { Login2 } from '../interfaces/login2';
import { TaskInterface } from '../interfaces/task1';
import { ViewsInterface } from '../interfaces/view1';
import { ViewsAlternateInterface } from '../interfaces/view2';



@Injectable({
  providedIn: 'root'
})
export class UserservicesService {

  constructor(private httpClientObj:HttpClient) { }

  addNewUser(obj:User)
  {
    return this.httpClientObj.post('http://localhost:2000/user/add',obj)
  }

  checkLogin(obj:Login2)
  {
    return this.httpClientObj.post('http://localhost:2000/user/login',obj)
  }

  addTask(obj:TaskInterface,token:string)
  {
    const headers={'Authorization':'Bearer '+token}
    console.log(headers)
    return this.httpClientObj.post('http://localhost:2000/tasks/addtask',obj,{headers})
  }
  
  viewAllTask(token:string,option:string):Observable<TaskInterface[]>
  {
    let httpOptions
    if(option=='true')
    {
      httpOptions={headers:{'Authorization':'Bearer '+token},params:{completed:'true'}}
    }
    else if(option=='false')
    {
      httpOptions={headers:{'Authorization':'Bearer '+token},params:{completed:'false'}}
    }
    else
    {
      httpOptions={headers:{'Authorization':'Bearer '+token},params:{completed:''}}
    }
    return this.httpClientObj.get<TaskInterface[]>('http://localhost:2000/tasks/viewAlltask',httpOptions)

  }

  getspecificTask(tid:any,token:string)
  {
    let httpOptions={
      headers:{'Authorization': 'Bearer '+token}
    }
    return this.httpClientObj.get<ViewsInterface>('http://localhost:2000/tasks/singletask/'+tid,httpOptions)
  }

  updateTask(obj:ViewsAlternateInterface,token:string):Observable<any>
  { 
    let httpOptions={
      headers:{'Authorization': 'Bearer '+token}
    }
    return this.httpClientObj.put('http://localhost:2000/tasks/UpdateTask/'+obj._id,obj,httpOptions)
  }

  deleteTask(id:any,token:string)
  {
    let httpOptions={
      headers:{'Authorization': 'Bearer '+token}
    }
    return this.httpClientObj.delete('http://localhost:2000/tasks/deleteSingletask/'+id,httpOptions)
  }

  logout(token:string)
  {
    console.log('Current Token'+token)
    const headers={'Authorization':'Bearer '+token}
    return this.httpClientObj.request('POST','http://localhost:2000/user/logout',{headers:headers})
  }

  logoutall(token:string)
  {
    console.log('Current Token'+token)
    const headers={'Authorization':'Bearer '+token}
    return this.httpClientObj.request('POST','http://localhost:2000/user/logoutall',{headers:headers})
  }
  
}
