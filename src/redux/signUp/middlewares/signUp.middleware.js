import {saveToLocalStore} from "../../../utils/localStore";
import {UPDATE_FORM} from "../actions";

const signUpMiddleware = () => next => action => {  
	if (action.type === UPDATE_FORM) {
        saveToLocalStore(action.form);
	}

	return next(action);
};

export { signUpMiddleware };