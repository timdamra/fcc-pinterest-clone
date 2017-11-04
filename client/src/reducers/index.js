import { combineReducers } from 'redux';

import authReducer from './authReducer';
import fetchPinsReducer from './fetchPinsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  myPins: fetchPinsReducer
});

export default rootReducer;
