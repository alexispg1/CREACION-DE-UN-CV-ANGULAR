import { Component, OnInit } from '@angular/core';
import{regex} from 'src/environments/environment.prod';
import{FormBuilder,Validators} from '@angular/forms';
import {Validation} from '../validation/validation';
import {UserService} from '../service/service.service';
import{Alert} from '../alerts/Alert';
import { Router, ActivatedRoute} from '@angular/router'
import { AuthService,GoogleLoginProvider,SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  validation=new Validation();
  alert =new Alert();
  login:any;
  profile=this.fb.group({
    email:['',[Validators.required,Validators.pattern(regex.validate_email)]],
    password:['',[Validators.required]],
  });
  constructor(private fb:FormBuilder,
    private userService:UserService,private router:Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    try{
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if(this.loggedIn===true){
          console.log("entron en el if true");
          this.router.navigate(['Dashboard',{user:JSON.stringify(this.user)}]);
          this.login={
            'google':true,
            'app':false,
          }
          localStorage.setItem('login',JSON.stringify(this.login));
        }
      });
    }catch(error){
      console.log("perro ",error);
    }
  }
  isValidField(field:string):boolean{
    return this.validation.isValidField_V(field,this.profile)
  }
  getErrorMessage(field:string):string{
    return this.validation.getErrorMessage_V(field,this.profile)
  }
  submit(){
    if(this.profile.valid){
      const email=this.validation.getEmail(this.profile);
      const password=this.validation.getPassword(this.profile);
      this.userService.login(email,password)
      .subscribe(
        response=>{
          console.log("response ",response);
          this.router.navigate(['Dashboard',{user:JSON.stringify(response)}]);
          this.login={
            'google':false,
            'app':true,
          }
          localStorage.setItem('login',JSON.stringify(this.login));
        },error=>{
          console.log("error",error);
          this.alert.error('credenciales erroneas',true);
        }
      ); 
    }
    else{
      alert("campos vacios");
    }
  }
  Google():void{
    console.log("login con google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
}
