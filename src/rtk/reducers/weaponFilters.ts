import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rtk/store";
import { Rarity, WeaponType } from "types/_common";
import { CommonMaterial, ForgeryMaterial } from "types/materials";

export interface WeaponFilterState {
    weaponType: WeaponType[];
    rarity: Rarity[];
    substats: string[];
    forgeryMat: ForgeryMaterial[];
    commonMat: CommonMaterial[];
}

const initialState: WeaponFilterState = {
    weaponType: [],
    rarity: [],
    substats: [],
    forgeryMat: [],
    commonMat: [],
};

export const weaponFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setWeaponType: (state, action: PayloadAction<WeaponType[]>) => {
            state.weaponType = action.payload;
        },
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        setSubstats: (state, action: PayloadAction<string[]>) => {
            state.substats = action.payload;
        },
        setForgeryMat: (state, action: PayloadAction<ForgeryMaterial[]>) => {
            state.forgeryMat = action.payload;
        },
        setCommonMat: (state, action: PayloadAction<CommonMaterial[]>) => {
            state.commonMat = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof WeaponFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
});

export const {
    setWeaponType,
    setRarity,
    setSubstats,
    setForgeryMat,
    setCommonMat,
    clearFilters,
} = weaponFilterSlice.actions;

export const selectWeaponFilters = (state: RootState): WeaponFilterState =>
    state.weaponFilters;
export const activeWeaponFilters = (state: RootState): boolean =>
    Object.keys(state.weaponFilters).filter(
        (filter) =>
            state.weaponFilters[filter as keyof WeaponFilterState].length
    ).length > 0;

export default weaponFilterSlice.reducer;
