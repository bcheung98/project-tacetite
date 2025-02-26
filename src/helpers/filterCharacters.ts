import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";
import { BrowserSettings } from "reducers/browser";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let chars = [...characters];
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.weapon.length > 0) {
        chars = chars.filter((char) => filters.weapon.includes(char.weapon));
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (filters.roles.length > 0) {
        if (filters.uniqueRoles) {
            chars = chars.filter((char) =>
                filters.roles.every((f) => char.combatRoles.includes(f))
            );
        } else {
            chars = chars.filter((char) =>
                filters.roles.some((f) => char.combatRoles.includes(f))
            );
        }
    }
    if (filters.forgeryMat.length > 0) {
        chars = chars.filter((char) =>
            filters.forgeryMat.includes(char.materials.forgeryMat)
        );
    }
    if (filters.commonMat.length > 0) {
        chars = chars.filter((char) =>
            filters.commonMat.includes(char.materials.commonMat)
        );
    }
    if (filters.ascensionMat.length > 0) {
        chars = chars.filter((char) =>
            filters.ascensionMat.includes(char.materials.ascensionMat)
        );
    }
    if (filters.bossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.bossMat.includes(char.materials.bossMat)
        );
    }
    if (filters.weeklyBossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.weeklyBossMat.includes(char.materials.weeklyBossMat)
        );
    }
    if (searchValue) {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    switch (sortSettings.sortBy) {
        case "name":
            chars = chars.sort((a, b) => a.fullName.localeCompare(b.fullName));
            break;
        case "rarity":
            chars = chars.sort(
                (a, b) =>
                    b.rarity - a.rarity || a.fullName.localeCompare(b.fullName)
            );
            break;
        case "element":
            chars = chars.sort(
                (a, b) =>
                    a.element.localeCompare(b.element) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "weapon":
            chars = chars.sort(
                (a, b) =>
                    a.weapon.localeCompare(b.weapon) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "release":
            chars = chars.sort(
                (a, b) => b.id - a.id || a.fullName.localeCompare(b.fullName)
            );
            break;
    }

    if (sortSettings.sortDirection === "desc") {
        chars = chars.reverse();
    }

    return chars;
}
