import { Component, OnInit } from '@angular/core';
import {Validation} from '../validation/validation';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import{regex} from 'src/environments/environment.prod';
import {MustMatch} from 'src/app/register/confirmPassword';
import {UserService} from '../service/service.service';
import{Alert} from '../alerts/Alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  validation=new Validation();
  alert=new Alert();
  profileForm = this.fb.group({
    name:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email:['',[Validators.required,Validators.pattern(regex.validate_email)]],
    password:['',[Validators.required,Validators.pattern(regex.validate_password)]],
    password_confirmation:['',[Validators.required]]
  }
  ,{
    validator: MustMatch('password', 'password_confirmation')
  });
  
  constructor (private fb:FormBuilder,private userService:UserService,
    private router:Router,private route:ActivatedRoute){ }

  ngOnInit(): void {
  }

  isValidField(field:string):boolean{
    return this.validation.isValidField_V(field,this.profileForm);
  }
  getErrorMessage(field:string):string{
    return this.validation.getErrorMessage_V(field,this.profileForm);
  }
  submit():void{
    if(this.profileForm.valid){
      const person=this.validation.getPerson(this.profileForm);
      this.userService.register(person)
      .subscribe(
        response=>{
          console.log("response ",response);
          this.alert.succesfull('registro exitoso',false);
          this.router.navigate(['login']);
        },error=>{
          console.log("error ",error);
          this.alert.error('intentelo mas tarde',true);
        }
      );
    }
    else{
      alert("debes de llenar los campos");
    }

  }

}
