import { combineReducers } from 'redux';
import canvas from './canvas';
import cursor from './cursor';
import fonts from './fonts';
import scroll from './scroll';
import size from './size';
import tasks from './tasks';
import timeframe from './timeframe';
import users from './users';
import zoom from './zoom';

export default combineReducers({
  canvas,
  cursor,
  fonts,
  scroll,
  size,
  tasks,
  timeframe,
  users,
  zoom
});
