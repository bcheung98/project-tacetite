import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCharacterBanners,
    fetchWeaponBanners,
    LoadingStatus,
} from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Banner } from "types/banner";

export interface BannerState {
    status: LoadingStatus;
    characterBanners: Banner[];
    weaponBanners: Banner[];
}

const initialState: BannerState = {
    status: "idle",
    characterBanners: [],
    weaponBanners: [],
};

export const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacterBanners.fulfilled, (state, action) => {
            state.characterBanners = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchCharacterBanners.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchWeaponBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchWeaponBanners.fulfilled, (state, action) => {
            state.weaponBanners = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchWeaponBanners.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectCharacterBanners = (state: RootState): Banner[] =>
    state.banners.characterBanners;
export const selectWeaponBanners = (state: RootState): Banner[] =>
    state.banners.weaponBanners;

export default bannerSlice.reducer;
