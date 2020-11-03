import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureStore(middlewares);

let store;
let signUpForm;

beforeEach(() => {
    const store = mockStore({
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
    });

    signUpForm = render(<Provider store={store}><SignUpForm /></Provider>);
});

test('Email input value on change', () => { 
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, {target: {value: 'test@test.de'}});
    expect(input.value).toBe('test@test.de');
});