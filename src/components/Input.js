import React from 'react';
import './Input.scss';

const Input = props => {
    const {label, type, name, value, handleChange, rows, cols, id} = props;
    const isValid = props.isValid === undefined || props.isValid;
    const validationText = props.validationText || '';

    if (type === 'checkbox') {
        return (
            <div className="input-container">
                <input
                    id={id}                                         
                    type={type}                    
                    name={name}
                    checked={value}
                    onChange={handleChange} />                    
                <label htmlFor={id} className="checkbox-label">{label}</label>
            </div>
        )
    }

    if (type === 'textarea') {
        return (
            <div className="input-container">
                <label htmlFor={id}>{label}</label>
                <textarea
                    id={id}                      
                    cols={cols}
                    rows={rows}
                    name={name}
                    value={value}
                    onChange={handleChange} />
                {!isValid && <p className="invalid-text" data-testid="error">{validationText}</p>}     
            </div>
        )
    }

    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className={!isValid ? "invalid" : undefined}
                type={type}
                name={name}
                value={value}
                onChange={handleChange} />
            {!isValid && <p className="invalid-text" data-testid={`error-${name}`}>{validationText}</p>}   
        </div>
    );
}

export default Input;