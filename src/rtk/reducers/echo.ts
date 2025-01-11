import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { startAppListening } from "helpers/hooks";
import { fetchEchoes, LoadingStatus } from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Echo } from "types/echo";

export interface EchoState {
    status: LoadingStatus;
    echoes: Echo[];
}

const storedEchoes = localStorage.getItem("data/echoes") || "null";

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: EchoState = {
    status: "idle",
    echoes: storedEchoes !== "null" ? JSON.parse(storedEchoes) : [],
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
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedEchoes) {
                state.echoes = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchEchoes.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectEchoes = (state: RootState): Echo[] => state.echoes.echoes;

export default characterSlice.reducer;

startAppListening({
    actionCreator: fetchEchoes.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedEchoes) {
            localStorage.setItem("data/echoes", data);
        }
    },
});
