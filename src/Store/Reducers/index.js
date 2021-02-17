/* eslint-disable import/no-unused-modules */
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import appData from './appData';

export default combineReducers({
  form: reduxFormReducer,
  appData,
});
