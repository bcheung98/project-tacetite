import { CostArray, CostNumber, PayloadCostObject } from "../types/costs"

export const characterLevel = (name: string) => {

    let bossMatArray
    name.startsWith("Rover-") ? bossMatArray = [0, 0, 1, 1, 1, 1, 1] : bossMatArray = [0, 0, 3, 6, 9, 12, 16]

    return {
        credits: [0, 5000, 10000, 15000, 20000, 40000, 80000],
        bossMat: bossMatArray,
        ascensionMat: [0, 0, 4, 8, 12, 16, 20],
        commonMat1: [0, 4, 4, 0, 0, 0, 0],
        commonMat2: [0, 0, 0, 8, 0, 0, 0],
        commonMat3: [0, 0, 0, 0, 4, 8, 0],
        commonMat4: [0, 0, 0, 0, 0, 0, 4]
    } as CostArray
}

export const characterLevelWithXP = (name: string) => {

    let bossMatArray
    name.startsWith("Rover-") ? bossMatArray = [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] : bossMatArray = [0, 0, 0, 0, 3, 0, 6, 0, 9, 0, 12, 0, 16, 0]

    return {
        credits: [0, 11655, 5000, 61425, 10000, 65905, 15000, 100310, 20000, 144550, 40000, 200340, 80000, 269115],
        characterXP1: [0, 3, 0, 2, 0, 2, 0, 0, 0, 4, 0, 2, 0, 1],
        characterXP2: [0, 1, 0, 2, 0, 1, 0, 1, 0, 3, 0, 1, 0, 0],
        characterXP3: [0, 1, 0, 1, 0, 3, 0, 3, 0, 5, 0, 1, 0, 1],
        characterXP4: [0, 1, 0, 8, 0, 8, 0, 13, 0, 18, 0, 28, 0, 38],
        bossMat: bossMatArray,
        ascensionMat: [0, 0, 0, 0, 4, 0, 8, 0, 12, 0, 16, 0, 20, 0],
        commonMat1: [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        commonMat2: [0, 0, 0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0],
        commonMat3: [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0],
        commonMat4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0]
    } as CostArray
}

export const getCharacterLevelCost = (name: string, [start, stop]: number[], selected: boolean): PayloadCostObject => {
    let [credits, characterXP1, characterXP2, characterXP3, characterXP4, bossMat, ascensionMat, commonMat1, commonMat2, commonMat3, commonMat4] = [...Array(11).keys()].map(() => 0)
    const costs = characterLevelWithXP(name)
    if (selected) {
        [credits, characterXP1, characterXP2, characterXP3, characterXP4, bossMat, ascensionMat, commonMat1, commonMat2, commonMat3, commonMat4] = Object.keys(costs).map((material) => costs[material].slice(start, stop).reduce((a, c) => a + c))
    }
    return {
        credits: credits,
        characterXP: {
            characterXP1: characterXP1,
            characterXP2: characterXP2,
            characterXP3: characterXP3,
            characterXP4: characterXP4
        },
        bossMat: {
            bossMat: bossMat
        },
        ascensionMat: {
            ascensionMat: ascensionMat
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
            commonMat4: commonMat4
        }
    }
}

export const characterForteLevel: CostArray = {
    credits: [0, 1500, 2000, 4500, 6000, 16000, 30000, 50000, 70000, 100000],
    weeklyBossMat: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    forgeryMat1: [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
    forgeryMat2: [0, 0, 0, 2, 3, 0, 0, 0, 0, 0],
    forgeryMat3: [0, 0, 0, 0, 0, 3, 5, 0, 0, 0],
    forgeryMat4: [0, 0, 0, 0, 0, 0, 0, 2, 3, 6],
    commonMat1: [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
    commonMat2: [0, 0, 0, 2, 3, 0, 0, 0, 0, 0],
    commonMat3: [0, 0, 0, 0, 0, 2, 3, 0, 0, 0],
    commonMat4: [0, 0, 0, 0, 0, 0, 0, 2, 3, 4],
}

export const getCharacterForteCost = ([start, stop]: number[], selected: boolean): PayloadCostObject => {
    let [credits, weeklyBossMat, forgeryMat1, forgeryMat2, forgeryMat3, forgeryMat4, commonMat1, commonMat2, commonMat3, commonMat4] = [...Array(10).keys()].map(() => 0)
    if (selected) {
        [credits, weeklyBossMat, forgeryMat1, forgeryMat2, forgeryMat3, forgeryMat4, commonMat1, commonMat2, commonMat3, commonMat4] = Object.keys(characterForteLevel).map((material) => characterForteLevel[material].slice(start, stop).reduce((a, c) => a + c))
    }
    return {
        credits: credits,
        weeklyBossMat: {
            weeklyBossMat: weeklyBossMat
        },
        forgeryMat: {
            forgeryMat1: forgeryMat1,
            forgeryMat2: forgeryMat2,
            forgeryMat3: forgeryMat3,
            forgeryMat4: forgeryMat4
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
            commonMat4: commonMat4
        }
    }
}

export const characterForteNode = (key: string, index: number) => {
    if (key === "circuit") {
        return index === 1 ? characterPassive1 : characterPassive2
    }
    else {
        return index === 1 ? characterForteNode1 : characterForteNode2
    }
}

const characterPassive1: CostNumber = {
    credits: 10000,
    forgeryMat2: 3,
    commonMat2: 3,
    weeklyBossMat: 1
}

const characterPassive2: CostNumber = {
    credits: 20000,
    forgeryMat3: 3,
    commonMat3: 3,
    weeklyBossMat: 1
}

const characterForteNode1: CostNumber = {
    credits: 50000,
    forgeryMat3: 3,
    commonMat3: 3
}

const characterForteNode2: CostNumber = {
    credits: 100000,
    forgeryMat4: 3,
    commonMat4: 3,
    weeklyBossMat: 1
}

export const getCharacterForteCostNode = (key: string, node: number, selected: boolean): PayloadCostObject => {
    let costs = characterForteNode(key, node)
    let results = {
        credits: selected ? costs.credits : 0,
        weeklyBossMat: {
            weeklyBossMat: selected ? (costs.weeklyBossMat ||= 0) : 0
        },
        forgeryMat: {
            forgeryMat1: 0,
            forgeryMat2: selected ? (costs.forgeryMat2 ||= 0) : 0,
            forgeryMat3: selected ? (costs.forgeryMat3 ||= 0) : 0,
            forgeryMat4: selected ? (costs.forgeryMat4 ||= 0) : 0,
        },
        commonMat: {
            commonMat1: 0,
            commonMat2: selected ? (costs.commonMat2 ||= 0) : 0,
            commonMat3: selected ? (costs.commonMat3 ||= 0) : 0,
            commonMat4: selected ? (costs.commonMat4 ||= 0) : 0,
        }
    }
    return results
}

export const weaponLevel = (rarity: number): CostArray => {
    return {
        credits: weaponCosts.credits[rarity],
        forgeryMat1: weaponCosts.forgeryMat1[rarity],
        forgeryMat2: weaponCosts.forgeryMat2[rarity],
        forgeryMat3: weaponCosts.forgeryMat3[rarity],
        forgeryMat4: weaponCosts.forgeryMat4[rarity],
        commonMat1: weaponCosts.commonMat1[rarity],
        commonMat2: weaponCosts.commonMat2[rarity],
        commonMat3: weaponCosts.commonMat3[rarity],
        commonMat4: weaponCosts.commonMat4[rarity]
    }
}

export const weaponLevelWithXP = (rarity: number): CostArray => {
    return {
        credits: weaponCostsWithXP.credits[rarity],
        weaponXP1: weaponCostsWithXP.weaponXP1[rarity],
        weaponXP2: weaponCostsWithXP.weaponXP2[rarity],
        weaponXP3: weaponCostsWithXP.weaponXP3[rarity],
        weaponXP4: weaponCostsWithXP.weaponXP4[rarity],
        forgeryMat1: weaponCostsWithXP.forgeryMat1[rarity],
        forgeryMat2: weaponCostsWithXP.forgeryMat2[rarity],
        forgeryMat3: weaponCostsWithXP.forgeryMat3[rarity],
        forgeryMat4: weaponCostsWithXP.forgeryMat4[rarity],
        commonMat1: weaponCostsWithXP.commonMat1[rarity],
        commonMat2: weaponCostsWithXP.commonMat2[rarity],
        commonMat3: weaponCostsWithXP.commonMat3[rarity],
        commonMat4: weaponCostsWithXP.commonMat4[rarity]
    }
}

export const getWeaponLevelCost = (rarity: number, [start, stop]: number[]): PayloadCostObject => {
    const costs = weaponLevelWithXP(rarity - 1)
    let [credits, weaponXP1, weaponXP2, weaponXP3, weaponXP4, forgeryMat1, forgeryMat2, forgeryMat3, forgeryMat4, commonMat1, commonMat2, commonMat3, commonMat4] = Object.keys(costs).map((material) => costs[material].slice(start, stop).reduce((a, c) => a + c))
    return {
        credits: credits,
        weaponXP: {
            weaponXP1: weaponXP1,
            weaponXP2: weaponXP2,
            weaponXP3: weaponXP3,
            weaponXP4: weaponXP4
        },
        forgeryMat: {
            forgeryMat1: forgeryMat1,
            forgeryMat2: forgeryMat2,
            forgeryMat3: forgeryMat3,
            forgeryMat4: forgeryMat4
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
            commonMat4: commonMat4
        }
    }
}

const weaponCosts = {
    credits: [
        [0, 2000, 4000, 8000, 12000],
        [0, 4000, 8000, 16000, 24000],
        [0, 6000, 12000, 24000, 36000, 48000, 72000],
        [0, 8000, 16000, 32000, 48000, 64000, 96000],
        [0, 10000, 20000, 40000, 60000, 80000, 120000]
    ],
    forgeryMat1: [
        [0, 0, 2, 0, 0],
        [0, 0, 3, 0, 0],
        [0, 0, 4, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 0]
    ],
    forgeryMat2: [
        [0, 0, 0, 2, 0],
        [0, 0, 0, 4, 0],
        [0, 0, 0, 5, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 8, 0, 0, 0]
    ],
    forgeryMat3: [
        [0, 0, 0, 0, 2],
        [0, 0, 0, 0, 3],
        [0, 0, 0, 0, 4, 0, 0],
        [0, 0, 0, 0, 5, 0, 0],
        [0, 0, 0, 0, 6, 0, 0]
    ],
    forgeryMat4: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 8],
        [0, 0, 0, 0, 0, 7, 10],
        [0, 0, 0, 0, 0, 8, 12]
    ],
    commonMat1: [
        [0, 2, 0, 0, 0],
        [0, 3, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 0],
        [0, 5, 0, 0, 0, 0, 0],
        [0, 6, 0, 0, 0, 0, 0]
    ],
    commonMat2: [
        [0, 0, 2, 0, 0],
        [0, 0, 3, 0, 0],
        [0, 0, 4, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 0]
    ],
    commonMat3: [
        [0, 0, 0, 1, 2],
        [0, 0, 0, 2, 3],
        [0, 0, 0, 3, 4, 0, 0],
        [0, 0, 0, 4, 5, 0, 0],
        [0, 0, 0, 4, 6, 0, 0]
    ],
    commonMat4: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 5],
        [0, 0, 0, 0, 0, 4, 7],
        [0, 0, 0, 0, 0, 4, 8]
    ]
}

const weaponCostsWithXP = {
    credits: [
        [0, 6000, 2000, 24400, 4000, 24400, 8000, 36800, 12000, 53600],
        [0, 7600, 4000, 30400, 8000, 30400, 16000, 45600, 24000, 66800],
        [0, 9200, 6000, 36400, 12000, 36400, 24000, 54800, 36000, 80400, 48000, 114000, 72000, 219600],
        [0, 14800, 8000, 60400, 16000, 60400, 32000, 91200, 48000, 133600, 64000, 190000, 96000, 366000],
        [0, 15600, 10000, 75200, 20000, 80000, 40000, 121200, 60000, 173200, 80000, 236400, 120000, 376800]
    ],
    weaponXP1: [
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2]
    ],
    weaponXP2: [
        [0, 2, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 2],
        [0, 1, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 2, 0, 2],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0]
    ],
    weaponXP3: [
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
        [0, 2, 0, 2, 0, 2, 0, 1, 0, 0, 0, 2, 0, 2],
        [0, 0, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1],
        [0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0]
    ],
    weaponXP4: [
        [0, 0, 0, 3, 0, 3, 0, 4, 0, 6, 0, 9, 0, 18],
        [0, 0, 0, 3, 0, 3, 0, 5, 0, 8, 0, 11, 0, 22],
        [0, 1, 0, 4, 0, 4, 0, 6, 0, 10, 0, 14, 0, 27],
        [0, 1, 0, 7, 0, 7, 0, 11, 0, 16, 0, 23, 0, 45],
        [0, 1, 0, 9, 0, 10, 0, 15, 0, 21, 0, 29, 0, 47]
    ],
    forgeryMat1: [
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    forgeryMat2: [
        [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0]
    ],
    forgeryMat3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0]
    ],
    forgeryMat4: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 10, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 12, 0]
    ],
    commonMat1: [
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    commonMat2: [
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    commonMat3: [
        [0, 0, 0, 0, 0, 0, 1, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 2, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0]
    ],
    commonMat4: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 7, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0]
    ]
}