export class Validators {
    static required(value = '') {
        //console.log('required', value);
        return value && value.trim()
    }

    static minLength(length) {           
        return value => {  
            console.log(value);            
            return value && value.length >= length
        }
    }
}