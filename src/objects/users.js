import { getUserHeight } from '../layout/grid';
import { getUsersTop, getFirstUserTop } from '../layout/timeline';
import { render as renderUser } from './user';

const USERS_WIDTH = 65;

export const render = (env) => {
  const {ctx, size} = env;
  const height = size.height - getUsersTop();

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, getUsersTop(), USERS_WIDTH, height);

  renderContent(env);
};

const renderContent = (env) => {
  const {ctx, scroll, timeline} = env;
  let offset = getFirstUserTop() - scroll.y;

  for (const row of timeline) {
    renderUser(env, row.user, 10, offset);
    offset += getUserHeight(row);
  }
};
