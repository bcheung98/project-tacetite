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
