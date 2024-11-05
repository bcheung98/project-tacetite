import { createSlice } from "@reduxjs/toolkit"
import { fetchCharacters } from "../actions/fetch"
import { Character } from "../../types/character"

interface State {
    loading: boolean,
    characters: Character[]
}

const initialState: State = {
    loading: false,
    characters: []
}

export const CharacterSlice = createSlice({
    name: "get_characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.characters = action.payload.sort((a, b) => a.name.localeCompare(b.name))
            state.loading = false
        })
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.loading = false
        })
    }
})

export default CharacterSlice.reducer