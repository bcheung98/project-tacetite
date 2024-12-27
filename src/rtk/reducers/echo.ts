import { createSlice } from "@reduxjs/toolkit";
import { fetchEchoes, LoadingStatus } from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Echo } from "types/echo";

export interface EchoeState {
    status: LoadingStatus;
    echoes: Echo[];
}

const initialState: EchoeState = {
    status: "idle",
    echoes: [],
};

export const characterSlice = createSlice({
    name: "echoes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEchoes.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchEchoes.fulfilled, (state, action) => {
            state.echoes = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchEchoes.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectEchoes = (state: RootState): Echo[] => state.echoes.echoes;

export default characterSlice.reducer;
