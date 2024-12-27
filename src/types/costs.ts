import { NestedKeyOf } from "./_common";
import { Character } from "./character";
import {
    AscensionMaterial,
    BossMaterial,
    CharacterXPMaterial,
    CommonMaterial,
    ForgeryMaterial,
    Materials,
    WeaponXPMaterial,
    WeeklyBossMaterial,
} from "./materials";

export interface CostArray {
    [material: string]: number[];
}

export interface CostNumber {
    [material: string]: number;
}

export type CostObjectKeys = NestedKeyOf<TotalCostObject>;

export type TotalCostObjectKeys = keyof TotalCostObject;

export interface TotalCostObject {
    credits: Record<"Credit", number>;
    characterXP: Record<CharacterXPMaterial, number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    bossMat: Record<BossMaterial, number>;
    weeklyBossMat: Record<WeeklyBossMaterial, number>;
    ascensionMat: Record<AscensionMaterial, number>;
    forgeryMat: Record<ForgeryMaterial, number>;
    commonMat: Record<CommonMaterial, number>;
}

export type PayloadCostObject = Record<
    TotalCostObjectKeys,
    Record<CostObjectKeys, number>
>;

export enum CostObjectSourceIndex {
    level,
    attack,
    skill,
    ultimate,
    forte,
    intro,
    passive1,
    passive2,
    bonusStat1,
    bonusStat2,
    bonusStat3,
    bonusStat4,
    bonusStat5,
    bonusStat6,
    bonusStat7,
    bonusStat8,
}

export interface UpdateCostsPayload {
    name: string;
    type: keyof typeof CostObjectSourceIndex;
    costs: PayloadCostObject;
}

export interface CharacterCost {
    credits: Record<"Credit", number[]>;
    characterXP: Record<CharacterXPMaterial, number[]>;
    bossMat: Record<BossMaterial, number[]>;
    weeklyBossMat: Record<WeeklyBossMaterial, number[]>;
    ascensionMat: Record<AscensionMaterial, number[]>;
    forgeryMat: Record<ForgeryMaterial, number[]>;
    commonMat: Record<CommonMaterial, number[]>;
}

export interface CharacterCostObject
    extends Pick<
        Character,
        "name" | "displayName" | "fullName" | "rarity" | "element" | "weapon"
    > {
    costs: CharacterCost;
}

export interface WeaponCostObject {
    name: string;
    displayName?: string;
    rarity: number;
    type: string;
    materials: Materials;
    costs: WeaponCost;
}

export interface WeaponCost {
    credits: Record<"Credit", number>;
    weaponXP: Record<CharacterXPMaterial, number>;
    forgeryMat: Record<ForgeryMaterial, number>;
    commonMat: Record<CommonMaterial, number>;
}
