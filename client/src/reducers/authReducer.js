import { AUTH, UNAUTH } from '../actions';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return { auth: true, payload: action.payload };
    case UNAUTH:
      return { auth: false };
    default:
      return state;
  }
};

export default authReducer;
