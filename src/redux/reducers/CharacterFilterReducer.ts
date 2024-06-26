import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface CharacterFiltersState {
    element: String[],
    weapon: String[],
    rarity: number[],
    tags: String[],
    uniqueTag: boolean,
    forgeryMat: String[],
    commonMat: String[],
    ascensionMat: String[],
    bossMat: String[],
    weeklyBossMat: String[],
    nation: String[]
}

const initialState: CharacterFiltersState = {
    element: [],
    weapon: [],
    rarity: [],
    tags: [],
    uniqueTag: false,
    forgeryMat: [],
    commonMat: [],
    ascensionMat: [],
    bossMat: [],
    weeklyBossMat: [],
    nation: []
}

export const CharacterFilterSlice = createSlice({
    name: "character filters",
    initialState,
    reducers: {
        setElement: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.element.includes(action.payload) ? state.element.push(action.payload) : state.element.splice(state.element.indexOf(action.payload), 1)
            changeText(action.type, state.element)
        },
        setWeapon: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.weapon.includes(action.payload) ? state.weapon.push(action.payload) : state.weapon.splice(state.weapon.indexOf(action.payload), 1)
            changeText(action.type, state.weapon)
        },
        setRarity: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.rarity.includes(action.payload) ? state.rarity.push(action.payload) : state.rarity.splice(state.rarity.indexOf(action.payload), 1)
            changeText(action.type, state.rarity)
        },
        setTags: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.tags.includes(action.payload) ? state.tags.push(action.payload) : state.tags.splice(state.tags.indexOf(action.payload), 1)
            changeText(action.type, state.tags)
        },
        setUniqueTag: (state, action: PayloadAction<any>) => {
            state.uniqueTag = action.payload
        },
        setForgeryMats: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.forgeryMat.includes(action.payload) ? state.forgeryMat.push(action.payload) : state.forgeryMat.splice(state.forgeryMat.indexOf(action.payload), 1)
            changeText(action.type, state.forgeryMat)
        },
        setCommonMats: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.commonMat.includes(action.payload) ? state.commonMat.push(action.payload) : state.commonMat.splice(state.commonMat.indexOf(action.payload), 1)
            changeText(action.type, state.commonMat)
        },
        setAscensionMats: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.ascensionMat.includes(action.payload) ? state.ascensionMat.push(action.payload) : state.ascensionMat.splice(state.ascensionMat.indexOf(action.payload), 1)
            changeText(action.type, state.ascensionMat)
        },
        setBossMats: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.bossMat.includes(action.payload) ? state.bossMat.push(action.payload) : state.bossMat.splice(state.bossMat.indexOf(action.payload), 1)
            changeText(action.type, state.bossMat)
        },
        setWeeklyBossMats: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.weeklyBossMat.includes(action.payload) ? state.weeklyBossMat.push(action.payload) : state.weeklyBossMat.splice(state.weeklyBossMat.indexOf(action.payload), 1)
            changeText(action.type, state.weeklyBossMat)
        },
    }
})

export const { setElement, setWeapon, setRarity, setTags, setUniqueTag, setForgeryMats, setCommonMats, setAscensionMats, setBossMats, setWeeklyBossMats } = CharacterFilterSlice.actions
export default CharacterFilterSlice.reducer

const changeButton = (target: string) => {
    if (target !== undefined) {
        let targetButton: any
        if (target === "4" || target === "5") {
            targetButton = document.getElementById(`${target}-button`)
        }
        else {
            targetButton = document.getElementById(`${target.toLowerCase()}-button`)
        }
        targetButton.className === "filter-off" ? targetButton.className = "filter-on" : targetButton.className = "filter-off"
    }
}

const changeText = (type: string, arr: any) => {
    let text = document.getElementById(`${type.split("/")[1].slice(3).toLowerCase()}-filter-text`)!
    text.className === "filter-text-on" && arr.length === 0 ? text.className = "filter-text-off" : text.className = "filter-text-on"
}