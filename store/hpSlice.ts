import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createHPService } from '../api/hp/api';
import { Character, Spell } from '../api/hp/types';

export interface HPState {
  characters: Character[];
  spells: Spell[];
  charactersLoading: boolean;
  spellsLoading: boolean;
}

const initialState: HPState = {
  characters: [],
  spells: [],
  charactersLoading: false,
  spellsLoading: false,
};

const hpService = createHPService('https://hp-api.onrender.com/api');

export const getCharacters = createAsyncThunk(
  'hp/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      return hpService.getCharacters();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch characters');
    }
  }
);

export const getSpells = createAsyncThunk(
  'hp/fetchSpells',
  async (_, { rejectWithValue }) => {
    try {
      return hpService.getSpells();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch spells');
    }
  }
);

const hpSlice = createSlice({
  name: 'hp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCharacters.pending, state => {
        state.charactersLoading = true;
      })
      .addCase(
        getCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.charactersLoading = false;
          state.characters = action.payload;
        }
      )
      .addCase(getCharacters.rejected, (state, action) => {
        state.charactersLoading = false;
      });

    builder
      .addCase(getSpells.pending, state => {
        state.spellsLoading = true;
      })
      .addCase(getSpells.fulfilled, (state, action: PayloadAction<Spell[]>) => {
        state.spellsLoading = false;
        state.spells = action.payload;
      })
      .addCase(getSpells.rejected, (state, action) => {
        state.spellsLoading = false;
      });
  },
});

export default hpSlice.reducer;
