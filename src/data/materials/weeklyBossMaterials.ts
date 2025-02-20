export const weeklyBossMaterials = [
    {
        id: "weeklyBossMat_0",
        category: "weeklyBossMat",
        tag: "Dreamless Feather",
        name: "Dreamless Feather",
        displayName: "Dreamless Feather",
        source: "Dreamless",
        rarity: 4,
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_1",
        category: "weeklyBossMat",
        tag: "Monument Bell",
        name: "Monument Bell",
        displayName: "Monument Bell",
        source: "Bell-Borne Geochelone",
        rarity: 4,
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_2",
        category: "weeklyBossMat",
        tag: "Unending Destruction",
        name: "Unending Destruction",
        displayName: "Unending Destruction",
        source: "Scar",
        rarity: 4,
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_3",
        category: "weeklyBossMat",
        tag: "Sentinel's Dagger",
        name: "Sentinel's Dagger",
        displayName: "Sentinel's Dagger",
        source: "Jué",
        rarity: 4,
        release: { version: "1.1" },
    },
    {
        id: "weeklyBossMat_4",
        category: "weeklyBossMat",
        tag: "The Netherworld's Stare",
        name: "The Netherworld's Stare",
        displayName: "The Netherworld's Stare",
        source: "Hecate",
        rarity: 4,
        release: { version: "2.0" },
    },
] as const;

export const weeklyBossMatNames = weeklyBossMaterials.map((mat) => mat.tag);

export function getWeeklyBossMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return weeklyBossMaterials.find((mat) => mat.id === id || mat.tag === tag);
}
