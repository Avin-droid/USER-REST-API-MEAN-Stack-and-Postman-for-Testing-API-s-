import { Component, OnInit } from '@angular/core';
import { UserservicesService } from '../services/userservices.service';
import {Types} from 'mongoose'
import { ViewsInterface } from '../interfaces/view1';
import { TaskInterface } from '../interfaces/task1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit{
  taskArr:Array<ViewsInterface>=[]
  obj=
  {
    completed:false
  }
  token:any=''
  selectedvalue:string=''
  constructor(private userServiceObj:UserservicesService ,private routerObj:Router){}
  ngOnInit(): void {
      this.token=localStorage.getItem('token')
    }
  viewtask()
  {
    this.selectedvalue=this.obj.completed.toString()
    console.log('Current Selected Value:'+this.selectedvalue)
    this.userServiceObj.viewAllTask(this.token,this.selectedvalue).subscribe((rec)=>{
      console.log('Data='+JSON.stringify(rec))
      this.taskArr=JSON.parse(JSON.stringify(rec))
    })
  }

  edit(id:any)
  {
    console.log('On Clicking Edit Button')
    this.routerObj.navigate(['TaskUpdate',id])
  }

  del(id:any)
  {
    window.confirm('Are You Sure You Wanna Delete This Task?')
    console.log('On Clicking Delete Button')
    this.userServiceObj.deleteTask(id,this.token).subscribe((rec)=>{
      console.log(rec)
      if(rec)
      {
      alert('Task Deleted Successfully...')
      }
      this.viewtask()
      this.routerObj.navigate(['Dashboard'])
    })
  }
  
}
