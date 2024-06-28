import { createSlice } from "@reduxjs/toolkit"
import { fetchEchoes } from "../actions/fetch"
import { EchoData } from "../../types/EchoData"

interface State {
    loading: boolean,
    echoes: EchoData[]
}

const initialState: State = {
    loading: false,
    echoes: []
}

export const EchoSlice = createSlice({
    name: "echo echoes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEchoes.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchEchoes.fulfilled, (state, action) => {
            state.echoes = action.payload.sort((a, b) => a.name.localeCompare(b.name))
            state.loading = false
        })
        builder.addCase(fetchEchoes.rejected, (state) => {
            state.loading = false
        })
    }
})

export default EchoSlice.reducer