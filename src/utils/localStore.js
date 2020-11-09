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

export const saveToLocalStoreDebounced = debounce(saveToLocalStore, 500);

function debounce (func, wait, immediate) {
    let timeout;
    
	return function() {
        const context = this;
		const args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
        }
        
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}