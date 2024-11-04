import { Materials } from "./materials"
import { Skill, SkillWithScaling } from "./skill"
import { Version } from "./version"

export interface Character {
    id: number,
    name: string,
    displayName?: string,
    title: string,
    rarity: 5 | 4,
    element: string,
    weapon: string,
    forte: ICharacterForte
    resonanceChain: ICharacterResonanceChain,
    stats: CharacterStats,
    materials: Materials,
    description: string,
    birthday: string,
    gender: string,
    nation: string,
    voiceActors: {
        en: string,
        jp: string
    },
    release: Version
}

export interface ICharacterForte {
    attack: CharacterForte,
    skill: CharacterForte,
    ultimate: CharacterForte,
    circuit: CharacterForte,
    intro: CharacterForte,
    outro: Skill
}

export interface CharacterForte extends SkillWithScaling {
    nodes: CharacterForteNode[]
}

export interface CharacterForteNode {
    type: string,
    description: string
}

export interface ICharacterResonanceChain {
    c1: Skill,
    c2: Skill,
    c3: Skill,
    c4: Skill,
    c5: Skill,
    c6: Skill
}

export interface CharacterStats {
    hp: number[][],
    atk: number[][],
    def: number[][]
}