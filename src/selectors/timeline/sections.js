import { createSelector } from 'reselect';
import { gridSelector } from '../grid';

const ROW_HEIGHT = 45;
const SECTION_PADDING = 25;

export const getSectionHeight = ({rows}) => {
  return Math.max(rows.length * ROW_HEIGHT, ROW_HEIGHT) + SECTION_PADDING;
};

export const allSectionsSelector = createSelector(
  gridSelector,
  (sections) => {
    const result = [];
    let offset = 0;

    for (const section of sections) {
      const height = getSectionHeight(section);
      result.push({...section, offset, height});
      offset += height;
    }

    return result;
  }
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
);

export const timelineHeight = createSelector(
  allSectionsSelector,
  sections => sections.reduce(
    (height, section) => height + section.height,
    0
  )
);
