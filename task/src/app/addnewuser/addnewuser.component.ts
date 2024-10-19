import { Component,OnInit } from '@angular/core';
import { User } from '../interfaces/user1';
import { FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';
import { UserservicesService } from '../services/userservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent implements OnInit{
  userArr:Array<User>=[]
  frmReg=new FormGroup({
    User_Id:new FormControl(),
    First_Name:new FormControl(),
    Last_Name:new FormControl(),
    Age:new FormControl(),
    Address:new FormControl(),
    Email_Id:new FormControl(),
    Password:new FormControl(),
    Contact:new FormControl()
  
  })

  regUser:User=
  {
    User_Id:'',
    First_Name:'',
    Last_Name:'',
    Age:'',
    Address:'',
    Email_Id:'',
    Password:'',
    Contact:''
  }

  constructor(private UserServiceObj:UserservicesService, private fb:FormBuilder ,private routerobj:Router){}
  ngOnInit(): void {
    this.frmReg=this.fb.group({
      User_Id:[this.regUser.User_Id,[Validators.pattern('^[0-9]+'),Validators.required]],
      First_Name:[this.regUser.First_Name,[Validators.pattern('^[a-zA-Z]+'),Validators.required]],
      Last_Name:[this.regUser.Last_Name,[Validators.pattern('^[a-zA-Z]+'),Validators.required]],
      Age:[this.regUser.Age,[Validators.pattern('^[0-9]+'),Validators.required]],
      Address:[this.regUser.Address,[Validators.required]],
      Email_Id:[this.regUser.Email_Id,[Validators.pattern('^[a-zA-Z0-9@.com]+'),Validators.required]],
      Password:[this.regUser.Password,[Validators.pattern('^[a-zA-Z0-9]+'),Validators.required]],
      Contact:[this.regUser.Contact,[Validators.pattern('^[0-9]+'),Validators.required]]
    })
  }
  saveUser()
  {
    let temp:User=
    {
      User_Id:this.regUser.User_Id,
      First_Name:this.regUser.First_Name,
      Last_Name:this.regUser.Last_Name,
      Age:this.regUser.Age,
      Address:this.regUser.Address,
      Email_Id:this.regUser.Email_Id,
      Password:this.regUser.Password,
      Contact:this.regUser.Contact
    }
    this.UserServiceObj.addNewUser(temp).subscribe((rec)=>{
      console.log(rec);
      alert('User Record Added SuccsessFully...')
      this.routerobj.navigate(['Dashboard'])
    })

    
    this.regUser=
    {
      User_Id:'',
      First_Name:'',
      Last_Name:'',
      Age:'',
      Address:'',
      Email_Id:'',
      Password:'',
      Contact:'',
    }
    
  }



}
