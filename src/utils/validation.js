export const isValidEmail = email => {
    const re = /\w+@\w+\.\w+(\.\w+)*/;
    return re.test(email);
}

export const isValidText = (text, chars) => {
    return text.length >= chars;
}

export const isValidPassword = password => {
    const re = /.*\d.*\d.*/; // at least 2 digits
    return password.length >= 6 && re.test(password);
}

export const isValidRepeatPassword = (password, repeatPassword) => {
    return password === repeatPassword;
}