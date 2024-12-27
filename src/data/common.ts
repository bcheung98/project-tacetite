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
    "Pistol",
    "Rectifier",
] as const;

export const rarities = [5, 4, 3, 2, 1] as const;

export enum EchoRarityMap {
    Common = 2,
    Elite,
    Overlord,
    Calamity,
}
