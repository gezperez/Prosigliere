import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createHPService } from '../api/hp/api';
import { Character, House, Spell } from '../api/hp/types';

export interface HPState {
  characters: Character[];
  spells: Spell[];
  charactersLoading: boolean;
  spellsLoading: boolean;
  favoriteCharacterIds: string[];
  selectedHouse: House | null;
  houses: House[];
  housesLoading: boolean;
}

const initialState: HPState = {
  characters: [],
  spells: [],
  charactersLoading: false,
  spellsLoading: false,
  favoriteCharacterIds: [],
  selectedHouse: null,
  houses: [],
  housesLoading: false,
};

const hpService = createHPService(process.env.EXPO_PUBLIC_API_URL || '');

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

export const getHouses = createAsyncThunk(
  'hp/fetchHouses',
  async (_, { rejectWithValue }) => {
    try {
      return hpService.getHouses();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch houses');
    }
  }
);

const hpSlice = createSlice({
  name: 'hp',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const characterId = action.payload;
      const index = state.favoriteCharacterIds.indexOf(characterId);
      if (index > -1) {
        state.favoriteCharacterIds.splice(index, 1);
      } else {
        state.favoriteCharacterIds.push(characterId);
      }
    },
    setSelectedHouse: (state, action: PayloadAction<House>) => {
      state.selectedHouse = action.payload;
    },
  },
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

    builder
      .addCase(getHouses.pending, state => {
        state.housesLoading = true;
      })
      .addCase(getHouses.fulfilled, (state, action: PayloadAction<House[]>) => {
        state.housesLoading = false;
        state.houses = action.payload;
      })
      .addCase(getHouses.rejected, (state, action) => {
        state.housesLoading = false;
      });
  },
});

export const { toggleFavorite, setSelectedHouse } = hpSlice.actions;
export default hpSlice.reducer;
