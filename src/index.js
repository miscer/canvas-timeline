import './styles/app.css';

import { createStore } from 'redux';

import canvas from './canvas';
import scroll from './scroll';
import size from './window_size';
import reducer from './reducers';
import { users, tasks } from './data';
import render from './render';

const store = createStore(reducer, {users, tasks});

size(store);
canvas(store);
scroll(store);
render(store);
