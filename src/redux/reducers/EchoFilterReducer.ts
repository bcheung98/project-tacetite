import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface EchoFilterState {
    class: string[],
    sonata: string[],
    uniqueSonata: boolean
}

const initialState: EchoFilterState = {
    class: [],
    sonata: [],
    uniqueSonata: false
}

export type EchoFilterKeys = keyof Omit<EchoFilterState, "uniqueSonata">

export const EchoFilterSlice = createSlice({
    name: "echo_filters",
    initialState,
    reducers: {
        setClass: (state, action: PayloadAction<string>) => {
            !state.class.includes(action.payload) ? state.class.push(action.payload) : state.class.splice(state.class.indexOf(action.payload), 1)
        },
        setSonata: (state, action: PayloadAction<string>) => {
            !state.sonata.includes(action.payload) ? state.sonata.push(action.payload) : state.sonata.splice(state.sonata.indexOf(action.payload), 1)
        },
        setUniqueSonata: (state, action: PayloadAction<boolean>) => {
            state.uniqueSonata = action.payload
        }
    }
})

export const { setClass, setSonata, setUniqueSonata } = EchoFilterSlice.actions
export default EchoFilterSlice.reducer