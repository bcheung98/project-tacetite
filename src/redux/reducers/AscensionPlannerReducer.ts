import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { WeaponData } from "../../types/WeaponData"
import { CharacterData } from "../../types/CharacterData"

interface PlannerState {
    totalCost: {},
    characters: [],
    characterCosts: [
        {
            name: string,
            costs: {
                credits: (number | number[])[],
                xp1: (number | number[])[],
                xp2: (number | number[])[],
                xp3: (number | number[])[],
                xp4: (number | number[])[],
                bossMat: (number | number[])[],
                forgery1: (number | number[])[],
                forgery2: (number | number[])[],
                forgery3: (number | number[])[],
                forgery4: (number | number[])[],
                common1: (number | number[])[],
                common2: (number | number[])[],
                common3: (number | number[])[],
                common4: (number | number[])[],
                ascensionMat: (number | number[])[],
                weeklyBossMat: (number | number[])[],
            }
        }
    ] | [],
    weapons: [],
    weaponCosts: [
        {
            name: string,
            costs: {
                credits: (number | number[])[],
                xp1: (number | number[])[],
                xp2: (number | number[])[],
                xp3: (number | number[])[],
                xp4: (number | number[])[],
                bossMat: (number | number[])[],
                forgery1: (number | number[])[],
                forgery2: (number | number[])[],
                forgery3: (number | number[])[],
                forgery4: (number | number[])[],
                common1: (number | number[])[],
                common2: (number | number[])[],
                common3: (number | number[])[],
                common4: (number | number[])[],
                ascensionMat: (number | number[])[],
                weeklyBossMat: (number | number[])[],
            }
        }
    ] | [],
}

const initialState: PlannerState = {
    totalCost: {},
    characters: [],
    characterCosts: [],
    weapons: [],
    weaponCosts: [],
}

export const PlannerSlice = createSlice({
    name: "ascension planner",
    initialState,
    reducers: {
        setPlannerCharacters: (state, action: PayloadAction<any>) => {
            let tempCharCosts = action.payload.map((char: CharacterData) => {
                let costs
                let currentCharacter = state.characterCosts.find((c: any) => char.name === c.name)
                // If the character is not already in the list, initialize the material array
                if (currentCharacter === undefined) {
                    costs = {
                        // Source of each material:
                        // [Level, [Basic Attack, Node 1, Node 2], [Skill, Node 1, Node 2], [Burst, Node 1, Node 2], [Forte Circuit, Passive 1, Passive 2], [Intro Skill, Node 1, Node 2]]
                        credits: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp1: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp2: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp3: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp4: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        bossMat: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery1: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery2: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery3: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery4: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common1: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common2: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common3: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common4: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        ascensionMat: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        weeklyBossMat: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
                    }
                }
                else {
                    costs = currentCharacter.costs
                }
                return (
                    {
                        name: char.name,
                        costs: costs,
                    }
                )
            })
            state.characters = action.payload
            state.characterCosts = tempCharCosts
        },
        updateCharacterCosts: (state, action: PayloadAction<[string, string, {}]>) => {
            let indexChar = state.characterCosts.indexOf((state.characterCosts.find((char: any) => char.name === action.payload[0])) as never)
            Object.keys(action.payload[2] as {}).forEach((key: string) => {
                switch (action.payload[1]) {
                    case "level":
                        state.characterCosts[indexChar].costs[key as keyof {}][0] = action.payload[2][key as keyof {}]
                        break
                    case "attack":
                        state.characterCosts[indexChar].costs[key as keyof {}][1][0] = action.payload[2][key as keyof {}]
                        break
                    case "attack_node1":
                        state.characterCosts[indexChar].costs[key as keyof {}][1][1] = action.payload[2][key as keyof {}]
                        break
                    case "attack_node2":
                        state.characterCosts[indexChar].costs[key as keyof {}][1][2] = action.payload[2][key as keyof {}]
                        break
                    case "skill":
                        state.characterCosts[indexChar].costs[key as keyof {}][2][0] = action.payload[2][key as keyof {}]
                        break
                    case "skill_node1":
                        state.characterCosts[indexChar].costs[key as keyof {}][2][1] = action.payload[2][key as keyof {}]
                        break
                    case "skill_node2":
                        state.characterCosts[indexChar].costs[key as keyof {}][2][2] = action.payload[2][key as keyof {}]
                        break
                    case "ultimate":
                        state.characterCosts[indexChar].costs[key as keyof {}][3][0] = action.payload[2][key as keyof {}]
                        break
                    case "ultimate_node1":
                        state.characterCosts[indexChar].costs[key as keyof {}][3][1] = action.payload[2][key as keyof {}]
                        break
                    case "ultimate_node2":
                        state.characterCosts[indexChar].costs[key as keyof {}][3][2] = action.payload[2][key as keyof {}]
                        break
                    case "circuit":
                        state.characterCosts[indexChar].costs[key as keyof {}][4][0] = action.payload[2][key as keyof {}]
                        break
                    case "circuit_node1":
                        state.characterCosts[indexChar].costs[key as keyof {}][4][1] = action.payload[2][key as keyof {}]
                        break
                    case "circuit_node2":
                        state.characterCosts[indexChar].costs[key as keyof {}][4][2] = action.payload[2][key as keyof {}]
                        break
                    case "intro":
                        state.characterCosts[indexChar].costs[key as keyof {}][5][0] = action.payload[2][key as keyof {}]
                        break
                    case "intro_node1":
                        state.characterCosts[indexChar].costs[key as keyof {}][5][1] = action.payload[2][key as keyof {}]
                        break
                    case "intro_node2":
                        state.characterCosts[indexChar].costs[key as keyof {}][5][2] = action.payload[2][key as keyof {}]
                        break
                    default:
                        break
                }
            })
        },
        setPlannerWeapons: (state, action: PayloadAction<any>) => {
            let tempWeaponCosts = action.payload.map((wep: WeaponData) => {
                let costs
                let currentWeapon = state.weaponCosts.find((w: any) => wep.name === w.name)
                // If the weapon is not already in the list, initialize the material array
                if (currentWeapon === undefined) {
                    costs = {
                        credits: 0,
                        wep_xp1: 0,
                        wep_xp2: 0,
                        wep_xp3: 0,
                        wep_xp4: 0,
                        forgery1: 0,
                        forgery2: 0,
                        forgery3: 0,
                        forgery4: 0,
                        common1: 0,
                        common2: 0,
                        common3: 0,
                        common4: 0,
                    }
                }
                else {
                    costs = currentWeapon.costs
                }
                return (
                    {
                        name: wep.name,
                        costs: costs,
                    }
                )
            })
            state.weapons = action.payload
            state.weaponCosts = tempWeaponCosts
        },
        updateWeaponCosts: (state, action: PayloadAction<[string, string, {}]>) => {
            let indexChar = state.weaponCosts.indexOf((state.weaponCosts.find((wep: any) => wep.name === action.payload[0])) as never)
            Object.keys(action.payload[2] as {}).forEach((key: string) => {
                state.weaponCosts[indexChar].costs[key as keyof {}] = action.payload[2][key as keyof {}]
            })
        }
    }
})

export const { setPlannerCharacters, updateCharacterCosts, setPlannerWeapons, updateWeaponCosts } = PlannerSlice.actions
export default PlannerSlice.reducer