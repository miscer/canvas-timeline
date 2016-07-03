const ROW_HEIGHT = 45;
const COLUMN_WIDTH = 45;
const ROW_PADDING = 25;

export const getRowHeight = () => ROW_HEIGHT;
export const getColumnWidth = () => COLUMN_WIDTH;

export const getUserHeight = (user) => {
  return Math.max(user.rows.length * ROW_HEIGHT, ROW_HEIGHT) + ROW_PADDING;
};
