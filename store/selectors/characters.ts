import { createSelector } from 'reselect';
import { RootState } from '..';

const selectHPState = (state: RootState) => state.hp;

export const selectCharacters = createSelector(
  [selectHPState],
  hpState => hpState.characters
);

export const selectStudents = createSelector([selectCharacters], characters =>
  characters.filter(char => char.hogwartsStudent)
);

export const selectStaff = createSelector([selectCharacters], characters =>
  characters.filter(char => char.hogwartsStaff)
);
