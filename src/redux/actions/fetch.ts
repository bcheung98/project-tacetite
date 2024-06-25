import { createAsyncThunk } from "@reduxjs/toolkit"

export interface CharacterData {
    id: number,
    name: string
}

export interface WeaponData {
    id: number,
    name: string
}

export interface EchoData {
    id: number,
    name: string
}

// https://bcheung98.github.io/project-tacetite-db/characters.json
const CharacterURL = "https://bcheung98.github.io/project-tacetite-db/characters.json"

// https://bcheung98.github.io/project-tacetite-db/weapons.json
const WeaponURL = "https://bcheung98.github.io/project-tacetite-db/weapons.json"

// https://bcheung98.github.io/project-tacetite-db/echoes.json
const EchoURL = "https://bcheung98.github.io/project-tacetite-db/echoes.json"

export const fetchCharacters = createAsyncThunk("GET/characters", async (): Promise<[CharacterData]> => {
    const response = await fetch(CharacterURL)
    return await response.json()
})

export const fetchWeapons = createAsyncThunk("GET/weapons", async (): Promise<[WeaponData]> => {
    const response = await fetch(WeaponURL)
    return await response.json()
})

export const fetchEchoes = createAsyncThunk("GET/echoes", async (): Promise<[EchoData]> => {
    const response = await fetch(EchoURL)
    return await response.json()
})