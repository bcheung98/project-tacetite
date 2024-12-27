import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters, LoadingStatus } from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Character } from "types/character";

export interface CharacterState {
    status: LoadingStatus;
    characters: Character[];
}

const initialState: CharacterState = {
    status: "idle",
    characters: [],
};

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.characters = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectCharacters = (state: RootState): Character[] =>
    state.characters.characters;

export default characterSlice.reducer;
