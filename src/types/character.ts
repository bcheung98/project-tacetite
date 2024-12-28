import { combatRoles } from "data/combatRoles";
import { Element, Rarity, WeaponType } from "./_common";
import { CharacterMaterials } from "./materials";
import { Skill, SkillWithScaling } from "./skill";
import { VersionWithDate } from "./version";

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
    bonusStats: string[];
    combatRoles: CombatRole[];
    materials: CharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female";
    nation: string;
    voiceActors: {
        en: string;
        jp: string;
    };
    release: VersionWithDate;
}

export interface CharacterSkills {
    attack: SkillWithScaling;
    skill: SkillWithScaling;
    ultimate: SkillWithScaling;
    forte: SkillWithScaling;
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

export type CombatRole = keyof typeof combatRoles;
