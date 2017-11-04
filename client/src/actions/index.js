import axios from 'axios';

export const AUTH = 'auth';
export const UNAUTH = 'unauth';
export const FETCH_PINS = 'fetch_pins';

export const SignUpAction = (
  { email, password },
  history
) => async dispatch => {
  try {
    const res = await axios.post('/api/signup', { email, password });
    console.log(res.data);
    dispatch({ type: AUTH, payload: res.data });
    localStorage.setItem('token', res.data.token);
    history.push('/');
  } catch (e) {
    dispatch({ type: UNAUTH });
    history.push('/signup');
  }
};

export const LogInAction = ({ email, password }, history) => async dispatch => {
  try {
    const res = await axios.post('/api/login', { email, password });
    console.log(res.data);
    dispatch({ type: AUTH, payload: res.data });
    localStorage.setItem('token', res.data.token);
    history.push('/');
  } catch (e) {
    dispatch({ type: UNAUTH });
    history.push('/signup');
  }
};

export const fetchMyPins = () => async dispatch => {
  const res = await axios.get('/api/mypins');

  dispatch({ type: FETCH_PINS, payload: res.data });
};

export const LogOutAction = history => dispatch => {
  dispatch({ type: UNAUTH });
  localStorage.clear();

  history.push('/');
};
