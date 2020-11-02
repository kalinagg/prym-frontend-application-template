import {readFromLocalStore} from '../../../utils/localStore';
import {UPDATE_FORM} from '../actions';

const initialState = {
	form: readFromLocalStore() || {}
}

const signUpReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_FORM:
			return ({
				...state,
				form: action.form
			});
		default:
			return state;
	}
};

export { signUpReducer };
