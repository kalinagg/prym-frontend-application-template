import React from 'react';

const Input = props => {
    const {label, type, name, value, handleChange, rows, cols} = props;
    const isValid = props.isValid === undefined || props.isValid;
    const validationText = props.validationText || '';

    if (type === 'checkbox') {
        return (
            <div>
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
            <div>
                <label>
                    {label}:
                    <textarea
                        cols={cols}
                        rows={rows}
                        name={name}
                        value={value}
                        onChange={handleChange} />
                    {!isValid && <p style={{color: 'red'}}>{validationText}</p>}     
                </label>
            </div>
        )
    }

    return (
        <div>
            <label>
                {label}:
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange} />
                {!isValid && <p style={{color: 'red'}}>{validationText}</p>}     
            </label>
        </div>
    );
}

export default Input;