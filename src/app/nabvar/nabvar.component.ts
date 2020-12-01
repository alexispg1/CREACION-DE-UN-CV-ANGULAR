import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import { AuthService } from "angularx-social-login";

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {
  @Input('input')show=false;
  @Input('google') login_google:boolean=false;
  @Input('app') login_app:boolean=false;

  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    console.log("navbar  show ",this.show);
    console.log("navbar login_app ",this.login_app);
    console.log("navbar login_google ",this.login_google);
  }
  signOut(): void{
    if(this.login_app===true){
      console.log("navbar salir login_app",this.login_app);
      this.router.navigate(['login']);
    }
    if(this.login_google===true){
      console.log("navbar salir login google ",this.login_google);
      //this.googleSignOut();
      this.authService.signOut();
      this.router.navigate(['login']);
    }
  }
  googleSignOut(): void {
    this.authService.signOut(); 
  }
 
}
