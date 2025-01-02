import { objectKeys } from "helpers/utils";

export const elements = [
    "Fusion",
    "Glacio",
    "Aero",
    "Electro",
    "Spectro",
    "Havoc",
] as const;

export const weapons = [
    "Sword",
    "Broadblade",
    "Gauntlet",
    "Pistols",
    "Rectifier",
] as const;

export const rarities = [5, 4, 3, 2, 1] as const;

export const echoes = <const>{
    Calamity: {
        rarity: 5,
        cost: 4,
    },
    Overlord: {
        rarity: 4,
        cost: 4,
    },
    Elite: {
        rarity: 3,
        cost: 3,
    },
    Common: {
        rarity: 2,
        cost: 1,
    },
};

export const echoClasses = objectKeys(echoes);
