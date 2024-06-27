import { createAsyncThunk } from "@reduxjs/toolkit"

// https://bcheung98.github.io/project-tacetite-db/characters.json
const CharacterURL = "https://bcheung98.github.io/project-tacetite-db/characters.json"

// https://bcheung98.github.io/project-tacetite-db/weapons.json
const WeaponURL = "https://bcheung98.github.io/project-tacetite-db/weapons.json"

// https://bcheung98.github.io/project-tacetite-db/echoes.json
const EchoURL = "https://bcheung98.github.io/project-tacetite-db/echoes.json"

export const fetchCharacters = createAsyncThunk("GET/characters", async (): Promise<[CharacterData]> => {
    const response = await fetch(CharacterURL)
    return await response.json()
})

export const fetchWeapons = createAsyncThunk("GET/weapons", async (): Promise<[WeaponData]> => {
    const response = await fetch(WeaponURL)
    return await response.json()
})

export const fetchEchoes = createAsyncThunk("GET/echoes", async (): Promise<[EchoData]> => {
    const response = await fetch(EchoURL)
    return await response.json()
})

export interface CharacterData {
    id: number,
    name: string,
    displayName?: string,
    title: string,
    rarity: number,
    element: string,
    weapon: string,
    forte: {
        attack: {
            name: string,
            description: string,
            scaling: string[][],
            nodes: [
                {
                    type: string,
                    description: string
                },
                {
                    type: string,
                    description: string
                }
            ]
        },
        skill: {
            name: string,
            description: string,
            scaling: string[][],
            nodes: [
                {
                    type: string,
                    description: string
                },
                {
                    type: string,
                    description: string
                }
            ]
        },
        ultimate: {
            name: string,
            description: string,
            scaling: string[][],
            nodes: [
                {
                    type: string,
                    description: string
                },
                {
                    type: string,
                    description: string
                }
            ]
        },
        circuit: {
            name: string,
            description: string,
            scaling: string[][],
            nodes: [
                {
                    type: string,
                    description: string
                },
                {
                    type: string,
                    description: string
                }
            ]
        },
        intro: {
            name: string,
            description: string,
            scaling: string[][],
            nodes: [
                {
                    type: string,
                    description: string
                },
                {
                    type: string,
                    description: string
                }
            ]
        },
        outro: {
            name: string,
            description: string
        }
    },
    resonanceChain: {
        c1: {
            name: string,
            description: string
        },
        c2: {
            name: string,
            description: string
        },
        c3: {
            name: string,
            description: string
        },
        c4: {
            name: string,
            description: string
        },
        c5: {
            name: string,
            description: string
        },
        c6: {
            name: string,
            description: string
        }
    },
    stats: {
        hp: number[][],
        atk: number[][],
        def: number[][]
    },
    materials: {
        forgeryMat: string,
        commonMat: string,
        ascensionMat: string,
        bossMat: string,
        weeklyBossMat: string
    },
    description: string,
    birthday: string,
    gender: string,
    nation: string,
    voiceActors: {
        en: string,
        jp: string
    },
    release: {
        date: string,
        version: string
    }
}

export interface WeaponData {
    name: string,
    displayName?: string,
    rarity: number,
    type: string,
    stats: {
        atk: string,
        subStat: "ATK" | "Crit Rate" | "Crit DMG" | "HP" | "Energy Regen" | "DEF",
        passive: {
            name: string,
            description: string,
            scaling: string[][]
        }
    },
    materials: {
        forgeryMat: string
        commonMat: string
    },
    description: string,
    release: {
        version: string
    }
}

export interface EchoData {
    id: number,
    name: string,
    displayName?: string,
    code: string,
    class: string,
    cost: number,
    skill: {
        description: string,
        cooldown: number,
        scaling: string[][]
    },
    sonata: string[][],
    hasPhantom: boolean,
    type: string,
    nation: string[][],
    release: {
        version: string
    }
}