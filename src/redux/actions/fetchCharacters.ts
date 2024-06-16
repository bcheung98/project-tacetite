import { createAsyncThunk } from "@reduxjs/toolkit"

export interface CharacterData {
    id: number,
    name: string
}

// https://bcheung98.github.io/project-tacetite-db/characters.json
const CharacterURL = "https://bcheung98.github.io/project-tacetite-db/characters.json";

export const fetchCharacters = createAsyncThunk("GET/characters", async (): Promise<[CharacterData]> => {
    const response = await fetch(CharacterURL)
    return await response.json()
})