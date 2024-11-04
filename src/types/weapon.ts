import { Materials } from "./materials"
import { SkillWithScaling } from "./skill"
import { Version } from "./version"

export interface Weapon {
    name: string,
    displayName?: string,
    rarity: 5 | 4 | 3,
    type: string,
    stats: WeaponStats,
    materials: Materials,
    description: string,
    release: Version
}

export interface WeaponStats {
    atk: string,
    subStat: string,
    passive: SkillWithScaling
}