import { CostArray, CostNumber } from "../types/costs"

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
        credits: [0, 11655, 5000, 61425, 10000, 65905, 15000, 100310, 20000, 144539, 40000, 200340, 80000, 269115],
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

export const characterForteLevel: CostArray = {
    credits: [0, 1500, 2000, 4500, 6000, 16000, 30000, 50000, 70000, 100000],
    forgeryMat1: [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
    forgeryMat2: [0, 0, 0, 2, 3, 0, 0, 0, 0, 0],
    forgeryMat3: [0, 0, 0, 0, 0, 3, 5, 0, 0, 0],
    forgeryMat4: [0, 0, 0, 0, 0, 0, 0, 2, 3, 6],
    commonMat1: [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
    commonMat2: [0, 0, 0, 2, 3, 0, 0, 0, 0, 0],
    commonMat3: [0, 0, 0, 0, 0, 2, 3, 0, 0, 0],
    commonMat4: [0, 0, 0, 0, 0, 0, 0, 2, 3, 4],
    weeklyBossMat: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
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
    forgeryMat1: 3,
    commonMat1: 3,
    weeklyBossMat: 1
}

const characterPassive2: CostNumber = {
    credits: 20000,
    forgeryMat2: 3,
    commonMat2: 3,
    weeklyBossMat: 1
}

const characterForteNode1: CostNumber = {
    credits: 50000,
    forgeryMat2: 3,
    commonMat2: 3
}

const characterForteNode2: CostNumber = {
    credits: 100000,
    forgeryMat3: 3,
    commonMat3: 3,
    weeklyBossMat: 1
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