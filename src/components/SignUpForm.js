import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateForm} from '../redux/signUp/actions';
import Input from './Input';

const SignUpForm = () => {    
    let initialForm = useSelector(state => state.signUp.form);

    initialForm = {
        firstName: '',
        lastName: '',
        email: '',
        nickname: '',
        password: '',
        repeatPassword: '',
        street: '',
        houseNumber: '',
        zip: '',
        city: '',
        additional: '',
        showAddress: false,
        ...initialForm
    }
    
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    const handleChange = (name, e) => {   
        const updatedForm = {
            ...form,
            [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
        
        setForm(updatedForm);
        dispatch(updateForm(updatedForm));
    }

    const isValidEmail = email => {
        const re = /\w+@\w+\.\w+(\.\w+)*/;
        return re.test(email);
    }

    const isValidText = (text, chars) => {
        return text.length >= chars;
    }

    const isValidPassword = password => {
        const re = /.*\d.*\d.*/; // at least 2 digits
        return password.length >= 6 && re.test(password);
    }

    const isValidRepeatPassword = (password, repeatPassword) => {
        return password === repeatPassword;
    }

    const validate = form => {
        const isValid = {
            firstName: isValidText(form.firstName, 2),
            lastName: isValidText(form.lastName, 2),
            email: isValidEmail(form.email),
            password: isValidPassword(form.password),
            repeatPassword: isValidRepeatPassword(form.password, form.repeatPassword),
            street: isValidText(form.lastName, 4),
            zip: isValidText(form.lastName, 5),
            city: isValidText(form.lastName, 4)          
        }

        isValid.allValid = 
            isValid.firstName && isValid.lastName && isValid.email && isValid.password && isValid.repeatPassword
            && (!form.showAddress || (isValid.street && isValid.zip && isValid.city));
        
        return isValid;
    }

    const isValid = validate(form);

    return (        
        <form noValidate>
            <Input
                label="First name"
                type="text"
                name="firstName"
                value={form.firstName}
                isValid={isValid.firstName}
                validationText="First name should be at least 2 characters!"
                handleChange={e => handleChange('firstName', e)} />
            <Input
                label="Last name"
                type="text"
                name="lastName"
                value={form.lastName}
                isValid={isValid.lastName}
                validationText="Last name should be at least 2 characters!"
                handleChange={e => handleChange('lastName', e)} />
            <Input
                label="Nick name"
                type="text"
                name="nickname"
                value={form.nickname}
                handleChange={e => handleChange('nickname', e)} />        
			<Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                isValid={isValid.email}
                validationText="Email is not valid!"
                handleChange={e => handleChange('email', e)} />
            <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                isValid={isValid.password}
                validationText="Password should have minimium 6 characters of which 2 numbers!"
                handleChange={e => handleChange('password', e)} />
            <Input
                label="Repeat password"
                type="password"
                name="repeatPassword"
                value={form.repeatPassword}
                isValid={isValid.repeatPassword}
                validationText="Repeat password should the same as password!"
                handleChange={e => handleChange('repeatPassword', e)} />
            <Input
                label="Show Address"
                type="checkbox"
                name="showAddress"
                value={form.showAddress}
                handleChange={e => handleChange('showAddress', e)} />
            {form.showAddress &&
                <React.Fragment>
                    <Input
                        label="Street"
                        type="text"
                        name="street"
                        value={form.street}
                        isValid={isValid.street}
                        validationText="Street should have at least 4 characters!"
                        handleChange={e => handleChange('street', e)} />
                    <Input
                        label="House / Apartment"
                        type="text"
                        name="houseNumber"
                        value={form.houseNumber}                
                        handleChange={e => handleChange('houseNumber', e)} />
                    <Input
                        label="Zip"
                        type="text"
                        name="zip"
                        value={form.zip}
                        isValid={isValid.zip}
                        validationText="Street should have at least 5 characters!"
                        handleChange={e => handleChange('zip', e)} />
                    <Input
                        label="City"
                        type="text"
                        name="city"
                        value={form.city}
                        isValid={isValid.city}
                        validationText="City should have at least 4 characters!"
                        handleChange={e => handleChange('city', e)} />
                    <Input
                        label="Additional"
                        type="textarea"
                        name="additional"
                        value={form.additional}
                        handleChange={e => handleChange('additional', e)} />    
                </React.Fragment>
            }
            <button disabled={!isValid.allValid} type="button">Sign Up</button>
		</form>
    );
}

export default SignUpForm;