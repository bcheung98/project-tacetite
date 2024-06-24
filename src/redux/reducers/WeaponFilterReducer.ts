import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface WeaponFiltersState {
    weaponType: String[],
    rarity: number[],
    substats: String[],
    forgeryMat: String[],
    commonMat: String[],
}

const initialState: WeaponFiltersState = {
    weaponType: [],
    rarity: [],
    substats: [],
    forgeryMat: [],
    commonMat: [],
}

export const WeaponFilterSlice = createSlice({
    name: "weapon filters",
    initialState,
    reducers: {
        setWeaponType: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.weaponType.includes(action.payload) ? state.weaponType.push(action.payload) : state.weaponType.splice(state.weaponType.indexOf(action.payload), 1)
            changeText(action.type, state.weaponType)
        },
        setRarity: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.rarity.includes(action.payload) ? state.rarity.push(action.payload) : state.rarity.splice(state.rarity.indexOf(action.payload), 1)
            changeText(action.type, state.rarity)
        },
        setSubstats: (state, action: PayloadAction<any>) => {
            changeButton(action.payload)
            !state.substats.includes(action.payload) ? state.substats.push(action.payload) : state.substats.splice(state.substats.indexOf(action.payload), 1)
            changeText(action.type, state.substats)
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
        }
    }
})


export const { setWeaponType, setRarity, setSubstats, setForgeryMats, setCommonMats } = WeaponFilterSlice.actions
export default WeaponFilterSlice.reducer

const changeButton = (target: string) => {
    if (target !== undefined) {
        let targetButton: any
        if (target === "4" || target === "5") {
            targetButton = document.getElementById(`weapon-${target}-button`)
        }
        else {
            targetButton = document.getElementById(`weapon-${target.toLowerCase()}-button`)
        }
        targetButton.className === "filter-off" ? targetButton.className = "filter-on" : targetButton.className = "filter-off"
    }
}

const changeText = (type: string, arr: any) => {
    let text = document.getElementById(`weapon-${type.split("/")[1].slice(3).toLowerCase()}-filter-text`)!
    text.className === "filter-text-on" && arr.length === 0 ? text.className = "filter-text-off" : text.className = "filter-text-on"
}