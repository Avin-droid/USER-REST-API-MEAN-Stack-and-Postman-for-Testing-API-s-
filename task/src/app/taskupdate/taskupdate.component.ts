import { Component,OnInit } from '@angular/core';
import { UserservicesService } from '../services/userservices.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewsInterface } from '../interfaces/view1';
import { ViewsAlternateInterface } from '../interfaces/view2';
import { Types } from 'mongoose';

@Component({
  selector: 'app-taskupdate',
  templateUrl: './taskupdate.component.html',
  styleUrls: ['./taskupdate.component.css']
})
export class TaskupdateComponent implements OnInit {
  token:any=''
  constructor(private updateserviceobj:UserservicesService , private routerobj:Router , private activatedRouterObj:ActivatedRoute){}
  regObj:ViewsInterface=
  {
    _id:new Types.ObjectId,
    description:'',
    completed:false,
    owner:new Types.ObjectId,
    createdAt:''
  }

  regObj2:ViewsAlternateInterface=
  {
    _id:new Types.ObjectId,
    owner:new Types.ObjectId,
    completed:false,
    createdAt:''

  }

  ngOnInit() {
    this.token=localStorage.getItem('token')
    this.activatedRouterObj.params.subscribe((id)=>{
      this.updateserviceobj.getspecificTask(id['tid'],this.token).subscribe((rec)=>{
        console.log(rec)
        this.regObj=rec
      })
    })
      
  }

  savetask()
  {
    console.log('for Update:'+this.regObj.createdAt)
    let temp:ViewsAlternateInterface=
    {
      _id:this.regObj._id,
      owner:this.regObj.owner,
      completed:this.regObj.completed,
      createdAt:this.regObj.createdAt
    }
    this.updateserviceobj.updateTask(temp,this.token).subscribe((rec)=>{
      alert('Task Updated Successfully...')
      console.log(rec)
      this.routerobj.navigate(['ViewAllTask'])
    })
  }


}
