import { Rarity } from "./_common";
import {
    characterXPMatNames,
    echoXPMatNames,
    weaponXPMatNames,
} from "data/materials/xpMaterials";
import { forgeryMatNames } from "data/materials/forgeryMaterials";
import { commonMatNames } from "data/materials/commonMaterials";
import { ascensionMatNames } from "data/materials/ascensionMaterials";
import { bossMatNames } from "data/materials/bossMaterials";
import { weeklyBossMatNames } from "data/materials/weeklyBossMaterials";
import { Version } from "./version";

export type MaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "bossMat"
    | "weeklyBossMat"
    | "ascensionMat"
    | "forgeryMat"
    | "commonMat";

export interface Material {
    id: string;
    category: MaterialCategory;
    tag: string;
    name: string;
    displayName: string;
    source?: string;
    rarity?: Rarity;
    release: Version;
}

export type CharacterXPMaterial = (typeof characterXPMatNames)[number];
export type WeaponXPMaterial = (typeof weaponXPMatNames)[number];
export type EchoXPMaterial = (typeof echoXPMatNames)[number];

export type ForgeryMaterial = (typeof forgeryMatNames)[number];
export type CommonMaterial = (typeof commonMatNames)[number];
export type AscensionMaterial = (typeof ascensionMatNames)[number];
export type BossMaterial = (typeof bossMatNames)[number];
export type WeeklyBossMaterial = (typeof weeklyBossMatNames)[number];

export interface Materials {
    forgeryMat?: ForgeryMaterial;
    commonMat?: CommonMaterial;
    ascensionMat?: AscensionMaterial;
    bossMat?: BossMaterial;
    weeklyBossMat?: WeeklyBossMaterial;
}

export type CharacterMaterials = Required<Materials>;
export type WeaponMaterials = Required<
    Pick<Materials, "forgeryMat" | "commonMat">
>;
