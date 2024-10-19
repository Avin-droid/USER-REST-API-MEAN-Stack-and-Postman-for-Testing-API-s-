import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserservicesService } from '../services/userservices.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  currenttoken:any=''
  constructor(private userserviceobj:UserservicesService ,private routerobj:Router){}
  ngOnInit(): void {
    this.currenttoken=localStorage.getItem('token')
    console.log('Current Token'+this.currenttoken)
  }

  Logout()
  {
    this.userserviceobj.logout(this.currenttoken).subscribe((rec)=>{
      console.log(rec)
      localStorage.setItem('id','')
      localStorage.setItem('firstname','')
      localStorage.setItem('email','')
      localStorage.setItem('token','')
      alert('Logged Out Successfully...')
    })
  }

  LogoutAll()
  {
    this.userserviceobj.logoutall(this.currenttoken).subscribe((rec)=>{
      console.log(rec)
      localStorage.setItem('id','')
      localStorage.setItem('firstname','')
      localStorage.setItem('email','')
      localStorage.setItem('token','')
      alert('Logged Out Successfully from all Devices...')
      this.routerobj.navigate(['Login'])
    })
  }


}
