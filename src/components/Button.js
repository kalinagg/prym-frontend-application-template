import React from 'react';
import './Button.scss';

const Button = props => 
        <button className="button" disabled={props.allValid} type="button">Sign Up</button>

export default Button;