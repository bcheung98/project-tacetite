import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CharacterFilterState {
    element: string[],
    weapon: string[],
    rarity: number[],
    tags: string[],
    uniqueTag: boolean,
    forgeryMat: string[],
    commonMat: string[],
    ascensionMat: string[],
    bossMat: string[],
    weeklyBossMat: string[],
    nation: string[]
}

const initialState: CharacterFilterState = {
    element: [],
    weapon: [],
    rarity: [],
    tags: [],
    uniqueTag: false,
    forgeryMat: [],
    commonMat: [],
    ascensionMat: [],
    bossMat: [],
    weeklyBossMat: [],
    nation: []
}

export type CharacterFilterKeys = keyof Omit<CharacterFilterState, "uniqueTag">

export const CharacterFilterSlice = createSlice({
    name: "character_filters",
    initialState,
    reducers: {
        setElement: (state, action: PayloadAction<string>) => {
            !state.element.includes(action.payload) ? state.element.push(action.payload) : state.element.splice(state.element.indexOf(action.payload), 1)
        },
        setWeapon: (state, action: PayloadAction<string>) => {
            !state.weapon.includes(action.payload) ? state.weapon.push(action.payload) : state.weapon.splice(state.weapon.indexOf(action.payload), 1)
        },
        setRarity: (state, action: PayloadAction<number>) => {
            !state.rarity.includes(action.payload) ? state.rarity.push(action.payload) : state.rarity.splice(state.rarity.indexOf(action.payload), 1)
        },
        setTags: (state, action: PayloadAction<string>) => {
            !state.tags.includes(action.payload) ? state.tags.push(action.payload) : state.tags.splice(state.tags.indexOf(action.payload), 1)
        },
        setUniqueTag: (state, action: PayloadAction<boolean>) => {
            state.uniqueTag = action.payload
        },
        setForgeryMats: (state, action: PayloadAction<string>) => {
            !state.forgeryMat.includes(action.payload) ? state.forgeryMat.push(action.payload) : state.forgeryMat.splice(state.forgeryMat.indexOf(action.payload), 1)
        },
        setCommonMats: (state, action: PayloadAction<string>) => {
            !state.commonMat.includes(action.payload) ? state.commonMat.push(action.payload) : state.commonMat.splice(state.commonMat.indexOf(action.payload), 1)
        },
        setAscensionMats: (state, action: PayloadAction<string>) => {
            !state.ascensionMat.includes(action.payload) ? state.ascensionMat.push(action.payload) : state.ascensionMat.splice(state.ascensionMat.indexOf(action.payload), 1)
        },
        setBossMats: (state, action: PayloadAction<string>) => {
            !state.bossMat.includes(action.payload) ? state.bossMat.push(action.payload) : state.bossMat.splice(state.bossMat.indexOf(action.payload), 1)
        },
        setWeeklyBossMats: (state, action: PayloadAction<string>) => {
            !state.weeklyBossMat.includes(action.payload) ? state.weeklyBossMat.push(action.payload) : state.weeklyBossMat.splice(state.weeklyBossMat.indexOf(action.payload), 1)
        }
    }
})

export const { setElement, setWeapon, setRarity, setTags, setUniqueTag, setForgeryMats, setCommonMats, setAscensionMats, setBossMats, setWeeklyBossMats } = CharacterFilterSlice.actions
export default CharacterFilterSlice.reducer