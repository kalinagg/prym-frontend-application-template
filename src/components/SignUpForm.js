import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateForm} from '../redux/signUp/actions';
import Button from './Button';
import Input from './Input';
import './SignUpForm.scss';
import {validate} from './SignUpFormValidation';

const SignUpForm = () => {    
    let initialForm = useSelector(state => state.signUp.form);

    initialForm = {
        firstName: {
            value: '',
            touched: false
        },
        lastName: {
            value: '',
            touched: false
        },
        email: {
            value: '',
            touched: false
        },
        nickname: {
            value: '',
            touched: false
        },
        password: {
            value: '',
            touched: false
        },
        repeatPassword: {
            value: '',
            touched: false
        },
        street: {
            value: '',
            touched: false
        },
        houseNumber: {
            value: '',
            touched: false
        },
        zip: {
            value: '',
            touched: false
        },
        city: {
            value: '',
            touched: false
        },
        additional: {
            value: '',
            touched: false
        },
        showAddress: {
            value: false,
            touched: false
        },
        ...initialForm
    }

    
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    const handleChange = e => {
        const updatedForm = {
            ...form,
            [e.target.name]: {
                value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                touched: true
            }
        }
        
        setForm(updatedForm);
        dispatch(updateForm(updatedForm));
    }

    const isValid = validate(form);

    return (        
        <form noValidate className="sign-up-form">
            <Input
                id="firstName"
                label="First name"
                type="text"
                name="firstName"
                value={form.firstName.value}
                isValid={isValid.firstName}
                validationText="First name should be at least 2 characters!"
                handleChange={handleChange} />
            <Input
                id="lastName"
                label="Last name"
                type="text"
                name="lastName"
                value={form.lastName.value}
                isValid={isValid.lastName}
                validationText="Last name should be at least 2 characters!"
                handleChange={handleChange} />
            <Input
                id="nickname"
                label="Nick name"
                type="text"
                name="nickname"
                value={form.nickname.value}
                handleChange={handleChange} />        
			<Input
                id="email"
                label="Email"
                type="email"
                name="email"
                value={form.email.value}
                isValid={isValid.email}
                validationText="Email is not valid!"
                handleChange={handleChange} />
            <Input
                id="password"
                label="Password"
                type="password"
                name="password"
                value={form.password.value}
                isValid={isValid.password}
                validationText="Password should have minimium 6 characters of which 2 numbers!"
                handleChange={handleChange} />
            <Input
                id="repeatPassword"
                label="Repeat password"
                type="password"
                name="repeatPassword"
                value={form.repeatPassword.value}
                isValid={isValid.repeatPassword}
                validationText="Repeat password should be the same as password!"
                handleChange={handleChange} />
            <Input
                id="showAddress"
                label="Show address"
                type="checkbox"
                name="showAddress"
                value={form.showAddress.value}
                handleChange={handleChange} />
            {form.showAddress.value &&
                <React.Fragment>
                    <Input
                        id="street"
                        label="Street"
                        type="text"
                        name="street"
                        value={form.street.value}
                        isValid={isValid.street}
                        validationText="Street should have at least 4 characters!"
                        handleChange={handleChange} />
                    <Input
                        id="houseNumber"
                        label="House / Apartment"
                        type="text"
                        name="houseNumber"
                        value={form.houseNumber.value}                
                        handleChange={handleChange} />
                    <Input
                        id="zip"
                        label="Zip"
                        type="text"
                        name="zip"
                        value={form.zip.value}
                        isValid={isValid.zip}
                        validationText="Zip should have at least 5 characters!"
                        handleChange={handleChange} />
                    <Input
                        id="city"
                        label="City"
                        type="text"
                        name="city"
                        value={form.city.value}
                        isValid={isValid.city}
                        validationText="City should have at least 4 characters!"
                        handleChange={handleChange} />
                    <Input
                        id="additonal"
                        label="Additional"
                        type="textarea"
                        name="additional"
                        value={form.additional.value}
                        rows={6}
                        cols={16}
                        handleChange={handleChange} />    
                </React.Fragment>
            }
            <Button allValid={!isValid.allValid} />
		</form>
    );
}

export default SignUpForm;