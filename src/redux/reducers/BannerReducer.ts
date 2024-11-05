import { createSlice } from "@reduxjs/toolkit"
import { fetchCharacterBanners, fetchWeaponBanners } from "../actions/fetch"
import { Banner } from "../../types/banner"

export interface BannerState {
    loading: boolean,
    characterBanners: Banner[],
    weaponBanners: Banner[],
}

const initialState: BannerState = {
    loading: false,
    characterBanners: [],
    weaponBanners: [],
}

export const BannerSlice = createSlice({
    name: "get_banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterBanners.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCharacterBanners.fulfilled, (state, action) => {
            state.characterBanners = action.payload
            state.loading = false
        })
        builder.addCase(fetchCharacterBanners.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(fetchWeaponBanners.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchWeaponBanners.fulfilled, (state, action) => {
            state.weaponBanners = action.payload
            state.loading = false
        })
        builder.addCase(fetchWeaponBanners.rejected, (state) => {
            state.loading = false
        })
    }
})

export default BannerSlice.reducer