import { FETCH_PINS } from '../actions';

const fetchPinsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PINS:
      return action.payload;
    default:
      return state;
  }
};

export default fetchPinsReducer;
