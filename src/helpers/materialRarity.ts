import { TotalCostObjectKeys } from "types/costs";

export const materialRarity: Record<TotalCostObjectKeys, [number, number]> = {
    credits: [3, 3],
    characterXP: [2, 5],
    weaponXP: [2, 5],
    bossMat: [4, 4],
    weeklyBossMat: [4, 4],
    ascensionMat: [1, 1],
    forgeryMat: [2, 5],
    commonMat: [2, 5],
};
