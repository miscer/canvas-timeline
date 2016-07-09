import { combineReducers } from 'redux';
import canvas from './canvas';
import fonts from './fonts';
import scroll from './scroll';
import size from './size';
import tasks from './tasks';
import timeframe from './timeframe';
import users from './users';

export default combineReducers({
  canvas,
  fonts,
  scroll,
  size,
  tasks,
  timeframe,
  users
});
