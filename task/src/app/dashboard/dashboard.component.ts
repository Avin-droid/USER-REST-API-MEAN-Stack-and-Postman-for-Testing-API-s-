import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserservicesService } from '../services/userservices.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  currentToken:any=''
  constructor(private userserviceobj:UserservicesService , private routerObj:Router){}
  ngOnInit(): void {
    this.currentToken=localStorage.getItem('token')
    console.log('Logout Token'+this.currentToken)
  }

    Logout()
    {
      window.confirm('Are you Sure You Wanna Logout')
      this.userserviceobj.logout(this.currentToken).subscribe((rec)=>{
        localStorage.setItem('id','')
        localStorage.setItem('firstname','')
        localStorage.setItem('email','')
        localStorage.setItem('token','')
        alert('Logged Out Succesfully...')
        this.routerObj.navigate(['Login'])


      })
    }

    LogoutAll()
    {
      window.confirm('Are you Sure You Wanna Logout from All Devices')
      this.userserviceobj.logoutall(this.currentToken).subscribe((rec)=>{
        console.log(rec)
          localStorage.setItem('id','')
          localStorage.setItem('firstname','')
          localStorage.setItem('email','')
          localStorage.setItem('token','')
          alert('Logged Out Succesfully from All Devices...')
          this.routerObj.navigate(['Login'])
        })
    }
   
      
  

}
