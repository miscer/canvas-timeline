import { context as contextSelector } from '../selectors/canvas';
import { sizeSelector, positionSelector } from '../selectors/timeline/users';
import { visibleSectionsSelector } from '../selectors/timeline/sections';
import { render as renderUser } from './user';

const USERS_WIDTH = 65;
const TOP_PADDING = 10;
const RIGHT_BORDER = 2;

export const render = (state) => {
  const ctx = contextSelector(state);
  const {height} = sizeSelector(state);
  const {top} = positionSelector(state);
  const sections = visibleSectionsSelector(state);
  const scroll = state.scroll;

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, top, USERS_WIDTH, height);

  ctx.fillStyle = '#e6e6e6';
  ctx.fillRect(USERS_WIDTH - RIGHT_BORDER, top, RIGHT_BORDER, height);

  for (const {offset, user} of sections) {
    const y = offset - scroll.y + top + TOP_PADDING;
    renderUser(state, user, 10, y);
  }
};
