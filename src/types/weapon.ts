import { WeaponBaseATK, WeaponSubStat } from "data/weaponStats";
import { Rarity, WeaponType } from "./_common";
import { WeaponMaterials } from "./materials";
import { SkillWithScaling } from "./skill";
import { Version } from "./version";

export interface WeaponProps {
    weapon: Weapon;
}

export interface Weapon {
    id: number;
    name: string;
    displayName: string;
    rarity: Rarity;
    type: WeaponType;
    stats: WeaponStats;
    materials: WeaponMaterials;
    description: string;
    release: Version;
}

export interface WeaponStats {
    atk: WeaponBaseATK;
    subStat: WeaponSubStat;
    passive: SkillWithScaling;
}
