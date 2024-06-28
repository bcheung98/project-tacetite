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