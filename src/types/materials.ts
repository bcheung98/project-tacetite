import { NestedKeyOf } from "./_common";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "data/materials/xpMaterials";
import { forgeryMaterials } from "data/materials/forgeryMaterials";
import { commonMaterials } from "data/materials/commonMaterials";
import { ascensionMaterials } from "data/materials/ascensionMaterials";
import { bossMaterials } from "data/materials/bossMaterials";
import { weeklyBossMaterials } from "data/materials/weeklyBossMaterials";

export type CharacterXPMaterial = keyof typeof characterXPMaterials;
export type WeaponXPMaterial = keyof typeof weaponXPMaterials;

export type ForgeryMaterialKeys = keyof typeof forgeryMaterials;
export type ForgeryMaterial = NestedKeyOf<typeof forgeryMaterials>;

export type CommonMaterialKeys = keyof typeof commonMaterials;
export type CommonMaterial = NestedKeyOf<typeof commonMaterials>;

export type AscensionMaterial = (typeof ascensionMaterials)[number];

export type BossMaterial = keyof typeof bossMaterials;
export type WeeklyBossMaterial = keyof typeof weeklyBossMaterials;

export interface Materials {
    forgeryMat?: ForgeryMaterialKeys;
    commonMat?: CommonMaterialKeys;
    ascensionMat?: AscensionMaterial;
    bossMat?: BossMaterial;
    weeklyBossMat?: WeeklyBossMaterial;
}

export type CharacterMaterials = Required<Materials>;
export type WeaponMaterials = Required<
    Pick<Materials, "forgeryMat" | "commonMat">
>;
