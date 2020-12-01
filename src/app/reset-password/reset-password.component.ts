import { Component, OnInit } from '@angular/core';
import{regex} from 'src/environments/environment.prod';
import{FormBuilder,Validators} from '@angular/forms';
import {Validation} from '../validation/validation';
import {MustMatch} from '../register/confirmPassword';
import {UserService} from '../service/service.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Alert}from '../alerts/Alert';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  validation=new Validation();
  data:any;
  token:any;
  id:any;
  alert =new Alert();
  profile=this.fb.group({
    password:['',[Validators.required,Validators.pattern(regex.validate_password)]],
    password_confirmation:['',[Validators.required]]
  }
  ,{
      validator: MustMatch('password', 'password_confirmation')
  });
  
  constructor(private fb:FormBuilder,private userService:UserService,
    private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data=this.activatedRoute.snapshot.params.token;
    let str=this.data.split('&');
    this.token=str[0];
    this.id=str[1];
  }
  
  isValidField(field:string):boolean{
    return this.validation.isValidField_V(field,this.profile);
  }
  getErrorMessage(field:string):string{
    return this.validation.getErrorMessage_V(field,this.profile);
  }
  submit(){
    if(this.profile.valid){
      const password=this.validation.getPassword(this.profile);
      const confirmation_password=password;
      this.userService.resetPasword(password,confirmation_password,this.id,this.token)
      .subscribe(
        response=>{
          this.alert.successful_account_message();
          this.router.navigate(['login']);
        },error=>{
          
        }
      )
    }
    else{
      alert("campos vacios");
    }
  }

}
