import { getColorFromId } from '../utils/color_map';

const getFirstName = (user) => user.name.split(/\s+/)[0].toLowerCase();
const getInitials = (user) => user.initials.toUpperCase();

const RECT_WIDTH = 43;
const RECT_HEIGHT = 43;

export const render = ({ctx}, user, x, y) => {
  ctx.save();

  ctx.fillStyle = '#bebebe';
  ctx.textAlign = 'center';
  ctx.font = '12px sans-serif';

  ctx.fillText(getFirstName(user), x + RECT_WIDTH / 2, y + RECT_HEIGHT + 15);

  ctx.lineWidth = 3;
  ctx.fillStyle = ctx.strokeStyle = getColorFromId(user.color_id);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 19px sans-serif';

  ctx.fillText(
    getInitials(user),
    x + RECT_WIDTH / 2,
    y + RECT_HEIGHT / 2
  );

  ctx.strokeRect(x, y, RECT_WIDTH, RECT_HEIGHT);

  ctx.restore();
};
