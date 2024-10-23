import { Component,OnInit } from '@angular/core';
import { Login1 } from '../interfaces/login1';
import { Login2 } from '../interfaces/login2';
import { UserservicesService } from '../services/userservices.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  obj:Login2=
  {
    Email_Id:'',
    Password:''
  }
  loginobj1:Login1=
  {
    id:'',
    firstname:'',
    Email_Id:'',
    token:''
  }
  

  
  temp:any
  t:any
  
  constructor(private loginserviceObj:UserservicesService, private routerObj:Router){}
  ngOnInit(): void {}
  logincheck()
  {
    this.loginserviceObj.checkLogin(this.obj).subscribe((loginData:any)=>{

      this.loginobj1=loginData.toString()
      this.temp=JSON.stringify(loginData)
      console.log('---'+this.temp)
      if(this.temp === '{}')
      {
        alert('invalid login...')
      }
      else
      {
        console.log(JSON.parse(this.temp))
        this.t=JSON.parse(this.temp)
        console.log('---'+this.t)
        localStorage.setItem('id',this.t.CurrentUser._id)
        localStorage.setItem('firstname',this.t.CurrentUser.firstname)
        localStorage.setItem('email',this.t.CurrentUser.email)
        localStorage.setItem('token',this.t.token)  
        alert('Logged in Succesfully...')
        this.routerObj.navigate(['Dashboard'])
      }
    })
    this.loginobj1=
    {
      id:'',
      firstname:'',
      Email_Id:'',
      token:''
    }

  }

}
