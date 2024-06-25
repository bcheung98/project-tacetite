import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface CharacterFiltersState {
    class: String[],
    sonata: String[]
}

const initialState: CharacterFiltersState = {
    class: [],
    sonata: []
}

export const EchoFilterSlice = createSlice({
    name: "echo filters",
    initialState,
    reducers: {
        setClass: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.class.includes(action.payload) ? state.class.push(action.payload) : state.class.splice(state.class.indexOf(action.payload), 1)
            changeText(action.type, state.class)
        },
        setSonata: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.sonata.includes(action.payload) ? state.sonata.push(action.payload) : state.sonata.splice(state.sonata.indexOf(action.payload), 1)
            changeText(action.type, state.sonata)
        },
    }
})

export const { setClass, setSonata } = EchoFilterSlice.actions
export default EchoFilterSlice.reducer

const changeButton = (target: string) => {
    if (target !== undefined) {
        let targetButton: any
        targetButton = document.getElementById(`echo-${target.toLowerCase()}-button`)
        if (["Calamity", "Overlord", "Elite", "Common"].includes(target)) {
            targetButton.className === "filter-button-off" ? targetButton.className = "filter-button-on" : targetButton.className = "filter-button-off"
        }
        else {
            targetButton.className === "filter-off" ? targetButton.className = "filter-on" : targetButton.className = "filter-off"
        }
    }
}

const changeText = (type: string, arr: any) => {
    let text = document.getElementById(`echo-${type.split("/")[1].slice(3).toLowerCase()}-filter-text`)!
    text.className === "filter-text-on" && arr.length === 0 ? text.className = "filter-text-off" : text.className = "filter-text-on"
}