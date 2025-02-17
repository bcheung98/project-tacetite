import { characterLevel, characterSkill, weaponLevel } from "data/levelUpCosts";
import { NestedKeyOf, Rarity } from "./_common";
import { Character } from "./character";
import { Weapon } from "./weapon";
import {
    AscensionMaterial,
    BossMaterial,
    CharacterXPMaterial,
    CommonMaterial,
    ForgeryMaterial,
    WeaponXPMaterial,
    WeeklyBossMaterial,
} from "./materials";

export type CostObjectKeys =
    | NestedKeyOf<TotalCostObject>
    | keyof ReturnType<typeof characterLevel>
    | keyof typeof characterSkill
    | keyof ReturnType<typeof weaponLevel>
    | "Credit";

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
    circuit,
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

export interface CostSliderData {
    start: number;
    stop: number;
    selected: boolean;
}

export type CostNodeData = Pick<CostSliderData, "selected">;

export type CostSliderValues = Record<
    keyof typeof CostObjectSourceIndex,
    CostSliderData
>;

export type CharacterCostSliderValues = CostSliderValues;
export type WeaponCostSliderValues = Pick<CostSliderValues, "level">;

export interface PayloadData extends Partial<CostSliderData> {
    name?: string;
    rarity?: Rarity;
    node?: number;
}

export interface UpdateCostsPayload {
    name: string;
    type: keyof typeof CostObjectSourceIndex;
    data: PayloadData;
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
        "name" | "fullName" | "rarity" | "element" | "weapon" | "release"
    > {
    id: string;
    costs: CharacterCost;
    values: CharacterCostSliderValues;
}

export interface WeaponCost {
    credits: Record<"Credit", number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    forgeryMat: Record<ForgeryMaterial, number>;
    commonMat: Record<CommonMaterial, number>;
}

export interface WeaponCostObject
    extends Pick<
        Weapon,
        "name" | "displayName" | "rarity" | "type" | "release"
    > {
    id: string;
    costs: WeaponCost;
    values: WeaponCostSliderValues;
}
