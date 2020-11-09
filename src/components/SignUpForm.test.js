import React from 'react';
import { fireEvent, render, screen, beforeAll, wait } from '../utils/render';
import SignUpForm from './SignUpForm';

const initialState = {
    signUp: {
        form: {}
    }
}

const showAddressState = {
    signUp: {
        form: {
            showAddress: {
                value: true
            }
        }
    }
}

const allValidState = {
    signUp: {
        form: {
            firstName: {
                value: 'ab',
                touched: true
            },
            lastName: {
                value: 'ab',
                touched: true
            },
            email: {
                value: 'abc@abc.de',
                touched: true
            },
            password: {
                value: 'abc123',
                touched: true
            },
            repeatPassword: {
                value: 'abc123',
                touched: true
            },
            street: {
                value: 'abcd',
                touched: true
            },
            zip: {
                value: 'abcde',
                touched: true
            },
            city: {
                value: 'abcd',
                touched: true
            },
            showAddress: {
                value: true,
                touched: true
            }
        }
    }
}

it('Checks if checkbox Show address works', () => {    
    render(<SignUpForm />, {initialState});
    const checkbox = screen.getByLabelText('Show address');
    expect(checkbox.checked).toBeFalsy();
    fireEvent.change(checkbox, {target: {checked: true}});
    expect(checkbox.checked).toBeTruthy();
});

it('Checks if input value changes on edit', () => {    
    render(<SignUpForm />, {initialState});
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, {target: {value: 'valid@email.de'}});
    expect(input.value).toBe('valid@email.de');
});

it.each([
    ['First name', 'ab'],
    ['Last name', 'ab'],
    ['Email', 'abc@abc.de'],
    ['Password', 'abc123'],
    ['Street', 'abcd'],
    ['Zip', 'abcde'],
    ['City', 'abcd'],
])('Does not show error message on valid %s', (label, text) => {
    render(<SignUpForm />, {initialState: showAddressState});

    const input = screen.getByLabelText(label);
    fireEvent.change(input, {target: {value: text}});

    const errorMessage = screen.queryByTestId(label);
    expect(errorMessage).toBeNull();
});

it('Does not show error message on valid Repeat Password', () => {
    render(<SignUpForm />, {initialState});
    const passwordInput = screen.getByLabelText('Password');
    const passwordRepeatInput = screen.getByLabelText('Repeat password');
    fireEvent.change(passwordInput, {target: {value: 'abc123'}});
    fireEvent.change(passwordRepeatInput, {target: {value: 'abc123'}});

    const errorMessage = screen.queryByTestId('error-repeatPassword');
    expect(errorMessage).toBeNull();
});

it.each([
    ['First name', 'a', 'error-firstName', 'First name should be at least 2 characters!'],
    ['Last name', 'a', 'error-lastName', 'Last name should be at least 2 characters!'],
    ['Email', 'abc@', 'error-email', 'Email is not valid!'],
    ['Password', 'abcdef', 'error-password', 'Password should have minimium 6 characters of which 2 numbers!'],
    ['Street', 'abc', 'error-street', 'Street should have at least 4 characters!'],
    ['Zip', 'abcd', 'error-zip', 'Zip should have at least 5 characters!'],
    ['City', 'abc', 'error-city', 'City should have at least 4 characters!'],
])('Shows error message on invalid %s', (label, text, errorId, expected) => {
    render(<SignUpForm />, {initialState: showAddressState});
    const input = screen.getByLabelText(label);
    fireEvent.change(input, {target: {value: text}});
    const errorMessage = screen.getByTestId(errorId);
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toBe(expected);
});

it('Shows error message on invalid Repeat Password', () => {
    render(<SignUpForm />, {initialState});
    const passwordInput = screen.getByLabelText('Password');
    const passwordRepeatInput = screen.getByLabelText('Repeat password');
    fireEvent.change(passwordInput, {target: {value: 'abc123'}});
    fireEvent.change(passwordRepeatInput, {target: {value: 'abc'}});

    const errorMessage = screen.getByTestId('error-repeatPassword');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toBe('Repeat password should be the same as password!');
});

it('Displays sign up button as disabled when some input is invalid', () => {
    render(<SignUpForm />, {initialState});
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
});

it('Displays sign up button as enabled when all inputs are valid', () => {
    render(<SignUpForm />, {initialState: allValidState});
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
});