import { Validators } from "./validators";

export class Form {
    constructor(form, controls){
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {};
        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value;
        })
        return value;
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = '';
        })
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];               
            let isValid = true;
            validators.forEach(validator => {                
                isValid = validator(this.form[control].value) && isValid
            })

            clearError(this.form[control]);
            if(!isValid){
                setError(this.form[control]);
            }           
            isFormValid = isFormValid && isValid;
        })

        return isFormValid;
    }
}

function setError($control) {
    const error = '<p class="validation-error"> Введите коректное значение </p>';
    $control.classList.add('invalid');
    $control.insertAdjacentHTML('afterend', error);
}

function clearError($control) {
    $control.classList.remove('invalid');
    const parentControl = $control.closest('.form-control');
    if($control.nextElementSibling) {
        parentControl.removeChild($control.nextElementSibling);
    }
}