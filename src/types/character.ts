import { Element, Rarity, WeaponType } from "./_common";
import { CharacterMaterials } from "./materials";
import { Skill, SkillWithScaling } from "./skill";
import { VersionWithDate } from "./version";
import { characterBonusStats } from "data/characterBonusStats";
import { combatRoles } from "data/combatRoles";

export interface CharacterProps {
    character: Character;
}

export interface Character {
    id: number;
    name: string;
    displayName: string;
    fullName: string;
    title: string;
    rarity: Exclude<Rarity, 3 | 2 | 1>;
    element: Element;
    weapon: WeaponType;
    skills: CharacterSkills;
    resonanceChain: CharacterResonanceChain;
    stats: CharacterStats;
    bonusStats: CharacterBonusStats;
    combatRoles: CombatRole[];
    materials: CharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female";
    nation: string;
    outfits: CharacterOutfit[];
    voiceActors: {
        en: string;
        jp: string;
    };
    release: VersionWithDate;
}

export type CharacterSkillKeyFull = keyof CharacterSkills;
export type CharacterSkillKey = Exclude<
    CharacterSkillKeyFull,
    "passive1" | "passive2"
>;

export interface CharacterSkills {
    attack: SkillWithScaling;
    skill: SkillWithScaling;
    ultimate: SkillWithScaling;
    circuit: SkillWithScaling;
    passive1: Skill;
    passive2: Skill;
    intro: SkillWithScaling;
    outro: Skill;
}

export interface CharacterResonanceChain {
    c1: Skill;
    c2: Skill;
    c3: Skill;
    c4: Skill;
    c5: Skill;
    c6: Skill;
}

export interface CharacterStats {
    hp: number[][];
    atk: number[][];
    def: number[][];
}

export type BonusStat = keyof typeof characterBonusStats;
export type CharacterBonusStats = [BonusStat, BonusStat];

export type CombatRole = keyof typeof combatRoles;

export interface CharacterOutfit {
    name: string;
    displayName: string;
    rarity: Rarity;
    description: string;
}
