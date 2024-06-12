import { createAsyncThunk } from "@reduxjs/toolkit"

export interface CharacterData {
    id: number,
    name: string
}

const CharacterURL = "http://localhost:3000/characters";

export const fetchCharacters = createAsyncThunk("GET/characters", async (): Promise<[CharacterData]> => {
    const response = await fetch(CharacterURL)
    return await response.json()
})