import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface WeaponFilterState {
    weaponType: string[],
    rarity: number[],
    substats: string[],
    forgeryMat: string[],
    commonMat: string[],
}

const initialState: WeaponFilterState = {
    weaponType: [],
    rarity: [],
    substats: [],
    forgeryMat: [],
    commonMat: [],
}

export type WeaponFilterKeys = keyof Omit<WeaponFilterState, "uniqueTag">

export const WeaponFilterSlice = createSlice({
    name: "weapon_filters",
    initialState,
    reducers: {
        setWeaponType: (state, action: PayloadAction<any>) => {
            !state.weaponType.includes(action.payload) ? state.weaponType.push(action.payload) : state.weaponType.splice(state.weaponType.indexOf(action.payload), 1)
        },
        setRarity: (state, action: PayloadAction<any>) => {
            !state.rarity.includes(action.payload) ? state.rarity.push(action.payload) : state.rarity.splice(state.rarity.indexOf(action.payload), 1)
        },
        setSubstats: (state, action: PayloadAction<any>) => {
            !state.substats.includes(action.payload) ? state.substats.push(action.payload) : state.substats.splice(state.substats.indexOf(action.payload), 1)
        },
        setForgeryMats: (state, action: PayloadAction<any>) => {
            !state.forgeryMat.includes(action.payload) ? state.forgeryMat.push(action.payload) : state.forgeryMat.splice(state.forgeryMat.indexOf(action.payload), 1)
        },
        setCommonMats: (state, action: PayloadAction<any>) => {
            !state.commonMat.includes(action.payload) ? state.commonMat.push(action.payload) : state.commonMat.splice(state.commonMat.indexOf(action.payload), 1)
        }
    }
})


export const { setWeaponType, setRarity, setSubstats, setForgeryMats, setCommonMats } = WeaponFilterSlice.actions
export default WeaponFilterSlice.reducer