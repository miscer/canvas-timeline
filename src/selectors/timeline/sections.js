import { createSelector } from 'reselect';
import { gridSelector } from '../grid';

const ROW_HEIGHT = 45;
const SECTION_PADDING = 25;

export const getSectionHeight = ({rows}) => {
  return Math.max(rows.length * ROW_HEIGHT, ROW_HEIGHT) + SECTION_PADDING;
};

export const allSectionsSelector = createSelector(
  gridSelector,
  (sections) =>
    sections.reduce((acc, section) => {
      const height = getSectionHeight(section);

      return {
        items: [
          ...acc.items,
          {
            ...section,
            offset: acc.offset,
            height: height,
          }
        ],
        offset: acc.offset + height,
      };
    }, {
      items: [],
      offset: 0,
    }).items
);

export const visibleSectionsSelector = createSelector(
  allSectionsSelector,
  state => state.scroll,
  state => state.size,
  (sections, scroll, size) => {
    const top = scroll.y;
    const bottom = scroll.y + size.height;

    return sections.filter(section => (
      section.offset < bottom &&
      section.offset + section.height > top
    ));
  }
)
