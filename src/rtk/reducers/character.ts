import { createSlice } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { fetchCharacters, LoadingStatus } from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Character } from "types/character";

export interface CharacterState {
    status: LoadingStatus;
    characters: Character[];
}

const storedCharacters = localStorage.getItem("data/characters") || "null";

const initialState: CharacterState = {
    status: "idle",
    characters: storedCharacters !== "null" ? JSON.parse(storedCharacters) : [],
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
            if (JSON.stringify(action.payload) !== storedCharacters) {
                state.characters = action.payload;
            }
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

startAppListening({
    actionCreator: fetchCharacters.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedCharacters) {
            localStorage.setItem("data/characters", data);
        }
    },
});
