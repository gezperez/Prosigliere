import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectHPState = (state: RootState) => state.hp;

export const selectSpells = createSelector(
  [selectHPState],
  hpState => hpState.spells
);
