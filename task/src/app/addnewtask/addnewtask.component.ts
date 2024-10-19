import { Component,OnInit } from '@angular/core';
import { TaskInterface } from '../interfaces/task1';
import { UserservicesService } from '../services/userservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewtask',
  templateUrl: './addnewtask.component.html',
  styleUrls: ['./addnewtask.component.css']
})
export class AddnewtaskComponent implements OnInit{

  taskobj:TaskInterface=
  {
    description:'',
    owner:''
  }
  temp:any
  t='' 
  constructor(private userServiceObj:UserservicesService, private routerObj:Router) { 
    
    
    this.t=localStorage.getItem('token')||''
    this.temp=localStorage.getItem('id') 
    console.log('ID:',this.temp)
    console.log('Token:',this.t)
    }
    ngOnInit(): void {
    }
    addTasks()
    {
      let tempObj:TaskInterface=
      {
        description:this.taskobj.description,
        owner:this.temp,
        completed:this.taskobj.completed
      }
      console.log(tempObj)
      this.userServiceObj.addTask(tempObj,this.t).subscribe((rec)=>{
        console.log('Added----'+JSON.stringify(rec))
        alert('Task Added SuccessFully...')
        this.routerObj.navigate(['Dashboard'])
    })
   }
 
}

