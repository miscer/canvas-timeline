import './styles/app.css';

import { createStore } from 'redux';

import canvas from './canvas';
import scroll from './scroll';
import cursor from './cursor';
import size from './window_size';
import fonts from './fonts';
import reducer from './reducers';
import { users, tasks } from './data';
import render from './render';

const store = createStore(reducer, {users, tasks});

size(store);
canvas(store);
scroll(store);
cursor(store);
render(store);
fonts(store);
