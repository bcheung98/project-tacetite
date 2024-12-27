import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { RootState } from "rtk/store";
import { EchoClass, EchoSonata } from "types/echo";

export interface EchoFilterState {
    class: EchoClass[];
    sonata: EchoSonata[];
    uniqueSonata: boolean;
}

const initialState: EchoFilterState = {
    class: [],
    sonata: [],
    uniqueSonata: false,
};

export type EchoFilterKeys = keyof Omit<EchoFilterState, "uniqueSonata">;

export const echoFilterSlice = createSlice({
    name: "echoFilters",
    initialState,
    reducers: {
        setClass: (state, action: PayloadAction<EchoClass[]>) => {
            state.class = action.payload;
        },
        setSonata: (state, action: PayloadAction<EchoSonata[]>) => {
            state.sonata = action.payload;
        },
        setUniqueSonata: (state, action: PayloadAction<boolean>) => {
            state.uniqueSonata = action.payload;
        },
    },
});

export const { setClass, setSonata, setUniqueSonata } = echoFilterSlice.actions;

export const selectEchoFilters = (state: RootState): EchoFilterState =>
    state.echoFilters;
export const activeEchoFilters = (state: RootState): boolean =>
    objectKeys(state.echoFilters).filter(
        (filter) =>
            filter !== "uniqueSonata" && state.echoFilters[filter].length
    ).length > 0;

export default echoFilterSlice.reducer;
