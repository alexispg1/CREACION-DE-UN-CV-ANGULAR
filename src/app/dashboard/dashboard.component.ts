import { Component, OnInit,Input} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  show:boolean=true;
  login_google:boolean=true;
  login_app:boolean=true;
  lista:string[]=["Casado", "Soltero", "Separado"];
  listaSex:string[]=["Masculino", "Femenino"];
  estudio:string[]=["Bachiller", "Licenciado", "Magíster", "Doctorado"];
  data:any;
  user:any;
  constructor(private route:ActivatedRoute) { 
  }  
  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem('login'));
    this.user=this.route.snapshot.paramMap.get('user');
    if(this.data.google===true){
      console.log("dashboard logeado con google ",this.data);
      this.login_app=false;
    }
    if(this.data.app===true){
      console.log("dashboard logeado con app ",this.data);
      this.login_google=false;
    }
    console.log("dashboard show ",this.show);
    console.log("dashboard login_app ",this.login_app);
    console.log("dashboard login_google ",this.login_google);
  }

  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', [297, 210]);
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Curriculum Vitae.pdf');
    });
  }
  

}
