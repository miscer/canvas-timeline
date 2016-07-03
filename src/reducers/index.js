import { combineReducers } from 'redux';
import canvas from './canvas';
import scroll from './scroll';
import size from './size';
import tasks from './tasks';
import timeframe from './timeframe';
import users from './users';

export default combineReducers({
  canvas,
  scroll,
  size,
  tasks,
  timeframe,
  users
});
