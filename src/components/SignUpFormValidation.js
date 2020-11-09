import {isValidEmail, isValidPassword, isValidRepeatPassword, isValidText} from "../utils/validation";

export const validate = form => {
    const isValid = {
        firstName: !form.firstName.touched || isValidText(form.firstName.value, 2),
        lastName: !form.lastName.touched || isValidText(form.lastName.value, 2),
        email: !form.email.touched || isValidEmail(form.email.value),
        password: !form.password.touched || isValidPassword(form.password.value),
        repeatPassword: !form.repeatPassword.touched || isValidRepeatPassword(form.password.value, form.repeatPassword.value),
        street: !form.street.touched || isValidText(form.street.value, 4),
        zip: !form.zip.touched || isValidText(form.zip.value, 5),
        city: !form.city.touched || isValidText(form.city.value, 4)
    }

    isValid.allValid = 
    form.firstName.touched && isValid.firstName
    && form.lastName.touched && isValid.lastName
    && form.email.touched && isValid.email 
    && form.password.touched && isValid.password 
    && form.repeatPassword.touched && isValid.repeatPassword
    && (!form.showAddress.value || (
        form.street.touched && isValid.street
        && form.zip.touched && isValid.zip
        && form.city.touched && isValid.city
        ));
        
    return isValid;
}    