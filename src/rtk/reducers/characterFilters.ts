import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { RootState } from "rtk/store";
import { Element, Rarity, WeaponType } from "types/_common";
import { CombatRole } from "types/character";
import {
    AscensionMaterial,
    BossMaterial,
    CommonMaterial,
    ForgeryMaterial,
    WeeklyBossMaterial,
} from "types/materials";

export interface CharacterFilterState {
    element: Element[];
    weapon: WeaponType[];
    rarity: Rarity[];
    roles: CombatRole[];
    uniqueRoles: boolean;
    forgeryMat: ForgeryMaterial[];
    commonMat: CommonMaterial[];
    ascensionMat: AscensionMaterial[];
    bossMat: BossMaterial[];
    weeklyBossMat: WeeklyBossMaterial[];
}

const initialState: CharacterFilterState = {
    element: [],
    weapon: [],
    rarity: [],
    roles: [],
    uniqueRoles: true,
    forgeryMat: [],
    commonMat: [],
    ascensionMat: [],
    bossMat: [],
    weeklyBossMat: [],
};

export const characterFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setElement: (state, action: PayloadAction<Element[]>) => {
            state.element = action.payload;
        },
        setWeapon: (state, action: PayloadAction<WeaponType[]>) => {
            state.weapon = action.payload;
        },
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        setRoles: (state, action: PayloadAction<CombatRole[]>) => {
            state.roles = action.payload;
        },
        toggleUniqueRoles: (state) => {
            state.uniqueRoles = !state.uniqueRoles;
        },
        setForgeryMat: (state, action: PayloadAction<ForgeryMaterial[]>) => {
            state.forgeryMat = action.payload;
        },
        setCommonMat: (state, action: PayloadAction<CommonMaterial[]>) => {
            state.commonMat = action.payload;
        },
        setAscensionMat: (
            state,
            action: PayloadAction<AscensionMaterial[]>
        ) => {
            state.ascensionMat = action.payload;
        },
        setBossMat: (state, action: PayloadAction<BossMaterial[]>) => {
            state.bossMat = action.payload;
        },
        setWeeklyBossMat: (
            state,
            action: PayloadAction<WeeklyBossMaterial[]>
        ) => {
            state.weeklyBossMat = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<
                Exclude<keyof CharacterFilterState, "uniqueRoles"> | undefined
            >
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
    setElement,
    setWeapon,
    setRarity,
    setRoles,
    toggleUniqueRoles,
    setForgeryMat,
    setCommonMat,
    setAscensionMat,
    setBossMat,
    setWeeklyBossMat,
    clearFilters,
} = characterFilterSlice.actions;

export const selectCharacterFilters = (
    state: RootState
): CharacterFilterState => state.characterFilters;
export const activeCharacterFilters = (state: RootState): boolean =>
    objectKeys(state.characterFilters).filter(
        (filter) =>
            filter !== "uniqueRoles" && state.characterFilters[filter].length
    ).length > 0;

export default characterFilterSlice.reducer;
