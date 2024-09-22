import { createAsyncThunk } from "@reduxjs/toolkit"
import { CharacterData } from "../../types/CharacterData"
import { WeaponData } from "../../types/WeaponData"
import { EchoData } from "../../types/EchoData"

// https://api.irminsul.gg/wuwa/characters.json
const CharacterURL = "https://api.irminsul.gg/wuwa/characters.json"

// https://api.irminsul.gg/wuwa/weapons.json
const WeaponURL = "https://api.irminsul.gg/wuwa/weapons.json"

// https://api.irminsul.gg/wuwa/echoes.json
const EchoURL = "https://api.irminsul.gg/wuwa/echoes.json"

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