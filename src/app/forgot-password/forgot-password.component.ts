import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators}from '@angular/forms';
import {Validation} from 'src/app/validation/validation';
import {regex} from 'src/environments/environment.prod';
import{UserService} from '../service/service.service';
import{Alert} from '../alerts/Alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {  
  validation=new Validation();
  alert=new Alert();
  profile=this.fb.group({
    email:['',[Validators.required,Validators.pattern(regex.validate_email)]],
  });
  
  constructor(private fb:FormBuilder,private userService:UserService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  isValidField(field:string):boolean{
    return this.validation.isValidField_V(field,this.profile);
  }
  getErrorMessage(field:string):string{
    return this.validation.getErrorMessage_V(field,this.profile);
  }
  submit(){
    if(this.profile.valid){
      const email=this.validation.getEmail(this.profile);
      this.userService.sendEmail(email)
      .subscribe(
        response=>{
          console.log("response ",response);
          if(response.message!="user not found"){
            this.alert.succesfull('verifique su correo',true);
            this.router.navigate(['login']);
          }else{
            this.alert.error('intente con un correo registrado',true);
          }   
        },error=>{
          console.log("error ",error);
          this.alert.error('intente con un correo registrado',true);
        }
      );
    }
    else{
      alert("campos vacions");
    }
  }

}
