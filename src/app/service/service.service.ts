import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string="http://redescv.ddns.net:8000/api/v1/"
  //@@@alexis$$145###
  constructor(private http:HttpClient){
  }
  login(email:string,password:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.url+"user/login",{email,password},{headers:headers});
  }
  register(person:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.url+"user/register",person,{headers:headers});
  }
  sendEmail(email:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.url+"user/sendEmail/email?email="+email,{headers:headers})
  }
  resetPasword(password:string,confirmation_password:string,id:number,token:string):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+token);
    const data={
      'password':password,
      'confirmation_password':confirmation_password,
    }
    return this.http.put<any>(this.url+"user/resetPassword/"+id,data,{headers:headers});
  }

}
