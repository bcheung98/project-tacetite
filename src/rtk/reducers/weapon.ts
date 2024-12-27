import { createSlice } from "@reduxjs/toolkit";
import { fetchWeapons, LoadingStatus } from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Weapon } from "types/weapon";

export interface WeaponState {
    status: LoadingStatus;
    weapons: Weapon[];
}

const initialState: WeaponState = {
    status: "idle",
    weapons: [],
};

export const weaponSlice = createSlice({
    name: "weapons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeapons.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchWeapons.fulfilled, (state, action) => {
            state.weapons = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchWeapons.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectWeapons = (state: RootState): Weapon[] =>
    state.weapons.weapons;

export default weaponSlice.reducer;
