import { PayloadCostObject } from "types/costs";
import { objectKeys, range } from "./utils";
import {
    characterBonusStat,
    characterLevel,
    characterPassive,
    characterSkill,
    weaponLevel,
} from "data/levelUpCosts";
import { Rarity } from "types/_common";

export function getCharacterLevelCost(
    [start, stop]: number[],
    selected: boolean,
    withXP = true,
    name: string
) {
    const costs = { ...characterLevel(name) };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        characterXP1,
        characterXP2,
        characterXP3,
        characterXP4,
        bossMat,
        ascensionMat,
        commonMat1,
        commonMat2,
        commonMat3,
        commonMat4,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            characterXP4,
            bossMat,
            ascensionMat,
            commonMat1,
            commonMat2,
            commonMat3,
            commonMat4,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        characterXP: {
            characterXP1: characterXP1,
            characterXP2: characterXP2,
            characterXP3: characterXP3,
            characterXP4: characterXP4,
        },
        bossMat: {
            bossMat: bossMat,
        },
        ascensionMat: {
            ascensionMat: ascensionMat,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
            commonMat4: commonMat4,
        },
    } as PayloadCostObject;
}

export function getCharacterSkillCost(
    [start, stop]: number[],
    selected: boolean
) {
    const costs = { ...characterSkill };
    let [
        credits,
        weeklyBossMat,
        forgeryMat1,
        forgeryMat2,
        forgeryMat3,
        forgeryMat4,
        commonMat1,
        commonMat2,
        commonMat3,
        commonMat4,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weeklyBossMat,
            forgeryMat1,
            forgeryMat2,
            forgeryMat3,
            forgeryMat4,
            commonMat1,
            commonMat2,
            commonMat3,
            commonMat4,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        weeklyBossMat: {
            weeklyBossMat: weeklyBossMat,
        },
        forgeryMat: {
            forgeryMat1: forgeryMat1,
            forgeryMat2: forgeryMat2,
            forgeryMat3: forgeryMat3,
            forgeryMat4: forgeryMat4,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
            commonMat4: commonMat4,
        },
    } as PayloadCostObject;
}

export function getCharacterPassiveCost(node: number, selected: boolean) {
    const costs = { ...characterPassive[node - 1] };
    let {
        credits,
        forgeryMat2,
        commonMat2,
        forgeryMat3,
        commonMat3,
        weeklyBossMat,
    } = costs;
    return {
        credits: {
            Credit: selected && credits ? credits : 0,
        },
        weeklyBossMat: {
            weeklyBossMat: selected && weeklyBossMat ? weeklyBossMat : 0,
        },
        forgeryMat: {
            forgeryMat1: 0,
            forgeryMat2: selected && forgeryMat2 ? forgeryMat2 : 0,
            forgeryMat3: selected && forgeryMat3 ? forgeryMat3 : 0,
            forgeryMat4: 0,
        },
        commonMat: {
            commonMat1: 0,
            commonMat2: selected && commonMat2 ? commonMat2 : 0,
            commonMat3: selected && commonMat3 ? commonMat3 : 0,
            commonMat4: 0,
        },
    } as PayloadCostObject;
}

export function getCharacterBonusStatCost(node: number, selected: boolean) {
    const costs = { ...characterBonusStat[node - 1] };
    let {
        credits,
        forgeryMat3,
        commonMat3,
        forgeryMat4,
        commonMat4,
        weeklyBossMat,
    } = costs;
    return {
        credits: {
            Credit: selected && credits ? credits : 0,
        },
        weeklyBossMat: {
            weeklyBossMat: selected && weeklyBossMat ? weeklyBossMat : 0,
        },
        forgeryMat: {
            forgeryMat1: 0,
            forgeryMat2: 0,
            forgeryMat3: selected && forgeryMat3 ? forgeryMat3 : 0,
            forgeryMat4: selected && forgeryMat4 ? forgeryMat4 : 0,
        },
        commonMat: {
            commonMat1: 0,
            commonMat2: 0,
            commonMat3: selected && commonMat3 ? commonMat3 : 0,
            commonMat4: selected && commonMat4 ? commonMat4 : 0,
        },
    } as PayloadCostObject;
}

export function getWeaponLevelCost(
    rarity: Rarity,
    [start, stop]: number[],
    selected: boolean,
    withXP = true
) {
    const costs = { ...weaponLevel(rarity) };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        weaponXP1,
        weaponXP2,
        weaponXP3,
        weaponXP4,
        forgeryMat1,
        forgeryMat2,
        forgeryMat3,
        forgeryMat4,
        commonMat1,
        commonMat2,
        commonMat3,
        commonMat4,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            weaponXP4,
            forgeryMat1,
            forgeryMat2,
            forgeryMat3,
            forgeryMat4,
            commonMat1,
            commonMat2,
            commonMat3,
            commonMat4,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        weaponXP: {
            weaponXP1: weaponXP1,
            weaponXP2: weaponXP2,
            weaponXP3: weaponXP3,
            weaponXP4: weaponXP4,
        },
        forgeryMat: {
            forgeryMat1: forgeryMat1,
            forgeryMat2: forgeryMat2,
            forgeryMat3: forgeryMat3,
            forgeryMat4: forgeryMat4,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
            commonMat4: commonMat4,
        },
    } as PayloadCostObject;
}

function calculateCosts<T extends { [key: string]: number[] }>(
    costs: T,
    start: number,
    stop: number
) {
    return Object.values(costs).map((arr) =>
        arr.slice(start, stop).reduce((a, c) => a + c)
    );
}
