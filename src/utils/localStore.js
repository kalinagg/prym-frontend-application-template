export const readFromLocalStore = () => {
    try {
        const serialisedForm = localStorage.getItem('form');
        return serialisedForm ? JSON.parse(serialisedForm) : undefined;
    } catch(err) {
        return undefined;
    }
}

export const saveToLocalStore = form => {
    try {
        const serialisedForm = JSON.stringify(form);
        localStorage.setItem('form', serialisedForm);
    } catch(err) {
        console.log(err);
    }
}