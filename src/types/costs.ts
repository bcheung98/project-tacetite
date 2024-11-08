import { ICharacterForte } from "./character"
import { Materials } from "./materials"

export interface CostArray {
    [material: string]: number[]
}

export interface CostNumber {
    [material: string]: number
}

export type MaterialKeys = keyof TotalCostObject

export interface TotalCostObject {
    credits: number,
    characterXP: CostNumber,
    weaponXP: CostNumber,
    bossMat: CostNumber,
    weeklyBossMat: CostNumber,
    ascensionMat: CostNumber,
    forgeryMat: CostNumber,
    commonMat: CostNumber
}

export interface CharacterCostObject {
    name: string,
    displayName?: string,
    fullName?: string,
    rarity: number,
    element: string,
    weapon: string,
    forte: ICharacterForte,
    materials: Materials
    costs: CharacterCost
}

export interface CharacterCost {
    credits: number[],
    characterXP: CostArray,
    bossMat: CostArray,
    weeklyBossMat: CostArray,
    ascensionMat: CostArray,
    forgeryMat: CostArray,
    commonMat: CostArray
}

export interface WeaponCostObject {
    name: string,
    displayName?: string,
    rarity: number,
    type: string,
    materials: Materials
    costs: WeaponCost
}

export interface WeaponCost {
    credits: number,
    weaponXP: CostNumber,
    forgeryMat: CostNumber,
    commonMat: CostNumber
}

export interface PayloadCostObject {
    [material: string]: number | CostNumber
}