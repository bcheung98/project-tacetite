import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Character } from "../../types/character"
import { Weapon } from "../../types/weapon"
import { CharacterCost, CharacterCostObject, CostArray, CostNumber, PayloadCostObject, TotalCostObject, WeaponCost, WeaponCostObject } from "../../types/costs"

interface PlannerState {
    totalCost: TotalCostObject,
    characterCosts: CharacterCostObject[],
    weaponCosts: WeaponCostObject[]
}

type ForteKeys = "level" | "attack" | "skill" | "ultimate" | "circuit" | "intro"
type ForteSubTypes = "main" | "node1" | "node2"

export interface PlannerPayload {
    name: string,
    type: ForteKeys,
    subType?: ForteSubTypes
    costs: PayloadCostObject
}

const initialState: PlannerState = {
    totalCost: {
        credits: 0,
        characterXP: {
            characterXP1: 0,
            characterXP2: 0,
            characterXP3: 0
        },
        weaponXP: {
            weaponXP1: 0,
            weaponXP2: 0,
            weaponXP3: 0
        },
        bossMat: {},
        weeklyBossMat: {},
        ascensionMat: {},
        forgeryMat: {},
        commonMat: {}
    },
    characterCosts: [],
    weaponCosts: []
}

export const PlannerSlice = createSlice({
    name: "ascension_planner",
    initialState,
    reducers: {
        setPlannerCharacters: (state, action: PayloadAction<Character[]>) => {
            const characterCostsDraft = action.payload.map((char: Character) => {
                const currentCharacter = state.characterCosts.find((c: CharacterCostObject) => char.name === c.name)
                // If the character is not already in the list, initialize the material array
                if (currentCharacter === undefined) {
                    const costs: CharacterCost = {
                        // Source of each material is mapped to a specific index in the array:
                        // [Level, Basic Attack, Node 1, Node 2, Skill, Node 1, Node 2, Ultimate, Node 1, Node 2, Forte Circuit, Passive 1, Passive 2, Intro Skill, Node 1, Node 2]
                        credits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        characterXP: {
                            characterXP1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            characterXP2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            characterXP3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            characterXP4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        },
                        bossMat: {
                            [`${char.materials.bossMat}`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        },
                        weeklyBossMat: {
                            [`${char.materials.weeklyBossMat}`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        },
                        ascensionMat: {
                            [`${char.materials.ascensionMat}`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        },
                        forgeryMat: {
                            [`${char.materials.forgeryMat}1`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [`${char.materials.forgeryMat}2`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [`${char.materials.forgeryMat}3`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [`${char.materials.forgeryMat}4`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        },
                        commonMat: {
                            [`${char.materials.commonMat}1`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [`${char.materials.commonMat}2`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [`${char.materials.commonMat}3`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [`${char.materials.commonMat}4`]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }
                    }
                    return {
                        name: char.name,
                        rarity: char.rarity,
                        element: char.element,
                        weapon: char.weapon,
                        forte: char.forte,
                        materials: char.materials,
                        costs: costs
                    } as CharacterCostObject
                }
                else {
                    return currentCharacter
                }
            })
            state.characterCosts = characterCostsDraft
        },
        updateCharacterCosts: (state, action: PayloadAction<PlannerPayload>) => {
            const charIndex = state.characterCosts.findIndex(({ name }) => name === action.payload.name)
            if (charIndex !== -1) {
                const { type, subType = "main", costs } = action.payload
                const index = getIndex(type, subType)
                Object.keys(costs).forEach((material: string) => {
                    let costValue = state.characterCosts[charIndex].costs[material as keyof CharacterCost]
                    let payloadCostValue = costs[material as keyof PayloadCostObject]
                    if (isArray(costValue)) {
                        if (payloadCostValue !== undefined && typeof payloadCostValue === "number") {
                            costValue[index] = payloadCostValue
                        }
                    }
                    else {
                        Object.keys(costValue).forEach((key, i) => {
                            if (!isArray(costValue)) {
                                let values = Object.values(payloadCostValue as PayloadCostObject)
                                if (values[i] !== undefined) {
                                    costValue[key][index] = values[i] as number
                                }
                            }
                        })
                    }
                })
            }
        },
        setPlannerWeapons: (state, action: PayloadAction<Weapon[]>) => {
            const weaponCostsDraft = action.payload.map((wep: Weapon) => {
                const currentWeapon = state.weaponCosts.find((w: WeaponCostObject) => wep.name === w.name)
                // If the weapon is not already in the list, initialize the material array
                if (currentWeapon === undefined) {
                    const costs: WeaponCost = {
                        credits: 0,
                        weaponXP: {
                            weaponXP1: 0,
                            weaponXP2: 0,
                            weaponXP3: 0,
                            weaponXP4: 0
                        },
                        forgeryMat: {
                            [`${wep.materials.forgeryMat}1`]: 0,
                            [`${wep.materials.forgeryMat}2`]: 0,
                            [`${wep.materials.forgeryMat}3`]: 0,
                            [`${wep.materials.forgeryMat}4`]: 0
                        },
                        commonMat: {
                            [`${wep.materials.commonMat}1`]: 0,
                            [`${wep.materials.commonMat}2`]: 0,
                            [`${wep.materials.commonMat}3`]: 0,
                            [`${wep.materials.commonMat}4`]: 0
                        }
                    }
                    return {
                        name: wep.name,
                        rarity: wep.rarity,
                        type: wep.type,
                        materials: wep.materials,
                        costs: costs
                    } as WeaponCostObject
                }
                else {
                    return currentWeapon
                }
            })
            state.weaponCosts = weaponCostsDraft
        },
        updateWeaponCosts: (state, action: PayloadAction<PlannerPayload>) => {
            const weaponIndex = state.weaponCosts.findIndex(({ name }) => name === action.payload.name)
            if (weaponIndex !== -1) {
                const { costs } = action.payload
                Object.keys(costs).forEach((material: string) => {
                    let costValue = state.weaponCosts[weaponIndex].costs[material as keyof WeaponCost]
                    let payloadCostValue = costs[material as keyof PayloadCostObject]
                    if (isNumber(costValue)) {
                        if (payloadCostValue !== undefined && typeof payloadCostValue === "number") {
                            state.weaponCosts[weaponIndex].costs.credits = payloadCostValue
                        }
                    }
                    else {
                        Object.keys(costValue).forEach((key, i) => {
                            if (!isNumber(costValue)) {
                                let values = Object.values(payloadCostValue as PayloadCostObject)
                                if (values[i] !== undefined) {
                                    costValue[key] = values[i] as number
                                }
                            }
                        })
                    }
                })
            }
        },
        updateTotalCosts: (state) => {
            let totalCostDraft: TotalCostObject = {
                credits: 0,
                characterXP: {
                    characterXP1: 0,
                    characterXP2: 0,
                    characterXP3: 0
                },
                weaponXP: {
                    weaponXP1: 0,
                    weaponXP2: 0,
                    weaponXP3: 0
                },
                bossMat: {},
                weeklyBossMat: {},
                ascensionMat: {},
                forgeryMat: {},
                commonMat: {}
            }
            state.characterCosts.forEach((character: CharacterCostObject) => {
                const reduced = reduceCosts({ ...character.costs })
                Object.entries(reduced).forEach(([material, value]) => {
                    if (material === "credits") {
                        totalCostDraft[material] += value
                    }
                    else {
                        Object.entries(value).forEach(([k, v]) => {
                            let costObj = totalCostDraft[material as keyof TotalCostObject]
                            if (!isNumber(costObj)) {
                                if (!Object.keys(costObj).includes(k)) {
                                    costObj[k] = 0
                                }
                                costObj[k] += v as number
                            }
                        })
                    }
                })
            })
            state.weaponCosts.forEach((weapon: WeaponCostObject) => {
                Object.entries(weapon.costs).forEach(([material, value]) => {
                    if (material === "credits") {
                        totalCostDraft[material] += value
                    }
                    else {
                        Object.entries(value).forEach(([k, v]) => {
                            let costObj = totalCostDraft[material as keyof TotalCostObject]
                            if (!isNumber(costObj)) {
                                if (!Object.keys(costObj).includes(k)) {
                                    costObj[k] = 0
                                }
                                costObj[k] += v as number
                            }
                        })
                    }
                })
            })
            state.totalCost = totalCostDraft
        }
    }
})

export const { setPlannerCharacters, updateCharacterCosts, setPlannerWeapons, updateWeaponCosts, updateTotalCosts } = PlannerSlice.actions
export default PlannerSlice.reducer

function getIndex(type: ForteKeys, subType: ForteSubTypes) {
    const indexMap = {
        level: 0,
        attack: 1,
        skill: 4,
        ultimate: 7,
        circuit: 10,
        intro: 13,
        // offsets
        main: 0,
        node1: 1,
        node2: 2
    }
    return indexMap[type] + indexMap[subType]
}

export function reduceCosts(costs: CharacterCost) {
    let result: TotalCostObject = {
        credits: 0,
        characterXP: {
            characterXP1: 0,
            characterXP2: 0,
            characterXP3: 0
        },
        weaponXP: {
            weaponXP1: 0,
            weaponXP2: 0,
            weaponXP3: 0
        },
        bossMat: {},
        weeklyBossMat: {},
        ascensionMat: {},
        forgeryMat: {},
        commonMat: {}
    }
    Object.entries(costs).forEach(([material, value]) => {
        if (material === "credits") {
            result[material] = (value as number[]).reduce((a, c) => a + c)
        }
        else {
            Object.entries(value).forEach(([k, v]) => {
                let costObj = result[material as keyof TotalCostObject]
                if (!isNumber(costObj)) {
                    costObj[k] = (v as number[]).reduce((a, c) => a + c)
                }
            })
        }
    })
    return result
}

function isArray(x: number[] | (CostArray | CostNumber) | unknown): x is number[] {
    return (x as number[]).length !== undefined
}

function isNumber(x: number | (CostArray | CostNumber) | unknown): x is number {
    return typeof x === "number"
}