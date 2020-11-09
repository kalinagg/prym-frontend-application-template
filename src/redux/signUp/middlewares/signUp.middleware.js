import {saveToLocalStoreDebounced} from "../../../utils/localStore";
import {UPDATE_FORM} from "../actions";

const signUpMiddleware = () => next => action => {  
	if (action.type === UPDATE_FORM) {
		saveToLocalStoreDebounced(action.form);
	}

	return next(action);
};

export { signUpMiddleware };