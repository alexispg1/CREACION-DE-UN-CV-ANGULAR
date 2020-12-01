import{FormGroup} from '@angular/forms';

export class Validation{
    constructor(){
        
    }
    isValidField_V(field:string,formGroup:FormGroup):boolean{
        var control=formGroup.get(field);
        if( (control.touched ||control.dirty )&&control.invalid){
            return true;
        }
        else{
            return false;
        }
    }
    getErrorMessage_V(field:string,formGroup:FormGroup):string{
        const control=formGroup.get(field);
        if(control.hasError('required')){
            return "campo requerido"
        }
        if(control.hasError('maxlength')){
            return "tu número de teléfono debe contener 10 digitos";
        }
        if(control.hasError('pattern')){
            
            if(control===formGroup.get('email')){
              return "dirección electrónica invalido";
            } 
            if(control===formGroup.get('cell_phone')){
              return "teléfono móvil invalido";
            }
            else{
              return "la contraseña debe contener almenos una letra mayuscula y minuscula un digito , un caracter especial ,longitud minima (8 caracteres)";
            }
        }
        if(control.errors.mustMatch){
            return "las contraseñas no coinciden";
        }
        if(control.errors.CurrentPassword){
            return "contraseña no coincide con la actual";
        }
        
    }
    getPerson(formGroup:FormGroup):any{
        let name=formGroup.get('name').value;
        let lastName=formGroup.get('lastName').value;
        let email=formGroup.get('email').value;
        let password=formGroup.get('password').value;
        let confirmation_password=formGroup.get('password_confirmation').value;
        const person={
            'userName':name,
            'userLastName':lastName,
            'email':email,
            'password':password,
            'confirmation_password':confirmation_password,
        }
        return person;
    }
    getEmail(formGroup:FormGroup):string{
        return formGroup.get('email').value;
    }
    getPassword(formGroup:FormGroup):string{
        return formGroup.get('password').value;
    }
}