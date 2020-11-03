import React from 'react';
import './Input.scss';

const Input = props => {
    const {label, type, name, value, handleChange, rows, cols} = props;
    const isValid = props.isValid === undefined || props.isValid;
    const validationText = props.validationText || '';

    if (type === 'checkbox') {
        return (
            <div className="input-container">
                <label>
                    <input                                          
                        type={type}                    
                        name={name}
                        checked={value}
                        onChange={handleChange} />                      
                    {label}
                </label>
            </div>
        )
    }

    if (type === 'textarea') {
        return (
            <div className="input-container">
                <label>
                    <p>{label}</p>
                    <textarea                        
                        cols={cols}
                        rows={rows}
                        name={name}
                        value={value}
                        onChange={handleChange} />
                    {!isValid && <p className="invalid-text">{validationText}</p>}     
                </label>
            </div>
        )
    }

    return (
        <div className="input-container">
            <label>
                <p>{label}</p>
                <input
                    className={!isValid ? "invalid" : undefined}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange} />
                {!isValid && <p className="invalid-text">{validationText}</p>}     
            </label>
        </div>
    );
}

export default Input;