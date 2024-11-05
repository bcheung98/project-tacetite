import { Version } from "./version"

export interface Echo {
    id: number,
    name: string,
    displayName?: string,
    code: string,
    class: "Calamity" | "Overlord" | "Elite" |  "Common",
    cost: number,
    skill: EchoSkill,
    sonata: string[][],
    hasPhantom: boolean,
    type: string,
    nation: string[][],
    release: Version
}

export interface EchoSkill {
    description: string,
    cooldown: number,
    scaling: string[][]
}