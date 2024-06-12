import { createSlice } from "@reduxjs/toolkit"
import { fetchCharacters, CharacterData } from "../actions/fetchCharacters"

interface State {
    loading: boolean,
    characters: CharacterData[]
}

const initialState: State = {
    loading: false,
    characters: []
}

export const CharacterSlice = createSlice({
    name: "character characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.characters = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default CharacterSlice.reducer;