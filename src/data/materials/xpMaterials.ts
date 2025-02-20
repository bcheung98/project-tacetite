export const characterXPMaterials = [
    {
        id: "characterXP_0",
        category: "characterXP",
        tag: "CharacterXP1",
        name: "Basic Resonance Potion",
        displayName: "Basic Resonance Potion",
        rarity: 2,
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_1",
        category: "characterXP",
        tag: "CharacterXP2",
        name: "Medium Resonance Potion",
        displayName: "Medium Resonance Potion",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_2",
        category: "characterXP",
        tag: "CharacterXP3",
        name: "Advanced Resonance Potion",
        displayName: "Advanced Resonance Potion",
        rarity: 4,
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_3",
        category: "characterXP",
        tag: "CharacterXP4",
        name: "Premium Resonance Potion",
        displayName: "Premium Resonance Potion",
        rarity: 5,
        release: {
            version: "1.0",
        },
    },
] as const;

export const weaponXPMaterials = [
    {
        id: "weaponXP_0",
        category: "weaponXP",
        tag: "WeaponXP1",
        name: "Basic Energy Core",
        displayName: "Basic Energy Core",
        rarity: 2,
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_1",
        category: "weaponXP",
        tag: "WeaponXP2",
        name: "Medium Energy Core",
        displayName: "Medium Energy Core",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_2",
        category: "weaponXP",
        tag: "WeaponXP3",
        name: "Advanced Energy Core",
        displayName: "Advanced Energy Core",
        rarity: 4,
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_3",
        category: "weaponXP",
        tag: "WeaponXP4",
        name: "Premium Energy Core",
        displayName: "Premium Energy Core",
        rarity: 5,
        release: {
            version: "1.0",
        },
    },
] as const;

export const echoXPMaterials = [
    {
        id: "echoXP_0",
        category: "echoXP",
        tag: "EchoXP1",
        name: "Basic Sealed Tube",
        displayName: "Basic Sealed Tube",
        rarity: 2,
        release: {
            version: "1.0",
        },
    },
    {
        id: "echoXP_1",
        category: "echoXP",
        tag: "EchoXP2",
        name: "Medium Sealed Tube",
        displayName: "Medium Sealed Tube",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: "echoXP_2",
        category: "echoXP",
        tag: "EchoXP3",
        name: "Advanced Sealed Tube",
        displayName: "Advanced Sealed Tube",
        rarity: 4,
        release: {
            version: "1.0",
        },
    },
    {
        id: "echoXP_3",
        category: "echoXP",
        tag: "EchoXP4",
        name: "Premium Sealed Tube",
        displayName: "Premium Sealed Tube",
        rarity: 5,
        release: {
            version: "1.0",
        },
    },
] as const;

export const characterXPMatNames = characterXPMaterials.map((mat) => mat.tag);
export const weaponXPMatNames = weaponXPMaterials.map((mat) => mat.tag);
export const echoXPMatNames = echoXPMaterials.map((mat) => mat.tag);

export function getCharacterXPMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return characterXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}

export function getWeaponXPMaterial({ id, tag }: { id?: string; tag: string }) {
    return weaponXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}

export function getEchoXPMaterial({ id, tag }: { id?: string; tag: string }) {
    return echoXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}
