import './styles/app.css';

import autoscale from 'autoscale-canvas';
import moment from 'moment';

import {render as renderUsers} from './objects/users';
import {render as renderHeader} from './objects/header';
import {timeline} from './data';

const element = document.querySelector('canvas');
element.width = window.innerWidth;
element.height = window.innerHeight;
autoscale(element);

const env = {
  ctx: element.getContext('2d'),
  size: {
    width: element.width,
    height: element.height,
  },
  scroll: {
    x: 0,
    y: 0,
  },
  timeline,
  timeframe: {
    date: moment.utc().startOf('day'),
  },
};

element.addEventListener('wheel', event => {
  event.preventDefault();

  env.scroll.x += event.deltaX;
  env.scroll.y += event.deltaY;

  render(env);
});

const render = (env) => {
  env.ctx.clearRect(0, 0, env.size.width, env.size.height);

  renderUsers(env);
  renderHeader(env);
};

render(env);
