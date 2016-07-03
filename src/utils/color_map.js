
const colors = [
  '#9e72bd',
  '#bb85e1',
  '#e1c3f6',
  '#efdbfd',
  '#ff43ad',
  '#df5755',
  '#fa777e',
  '#f7989d',
  '#f8b0af',
  '#f9a97b',

  '#d87944',
  '#f5c0a1',
  '#f1925b',
  '#f9c9c8',
  '#b8f0bd',
  '#66bcb5',
  '#c1cdf6',
  '#a4e3de',
  '#b9f1ec',
  '#7cd680',

  '#99fa42',
  '#ece162',
  '#ded237',
  '#fdf6a6',
  '#88d8d2',
  '#7d8ec6',
  '#5eacfc',
  '#94a6e3',
  '#aabaed',
  '#c8a0e4',

  '#59b660',
  '#9aeea0',
  '#cdfcd0',
  '#d6f9f7',
  '#cdcdcd',
  '#c4b714',
  '#f8e928',
  '#fcf27b',
  '#fddbc0',
  '#dce4fc'
]

export default colors;

export function getColorFromId(id) {
  return colors[id - 1];
};
