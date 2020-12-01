import Swal from 'sweetalert2'

export class Alert{
    constructor(){

    }
    succesfull(text:string,status:boolean){
        Swal.fire({
            position:'center',
            icon: 'success',
            title:text,
            showConfirmButton:status,
            timer: 1500
        })
    }
    error(title:string,status:boolean){
        Swal.fire({
            position:'center',
            icon:'error',
            title: title,
            showConfirmButton:status,
        }) 
    }
    successful_account_message(){
        Swal.fire(
            'cuenta',
            'tu cuenta a sido recuperada',
            'success'
        )
    }
}