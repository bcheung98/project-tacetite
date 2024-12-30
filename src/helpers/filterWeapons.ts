import { WeaponFilterState } from "reducers/weaponFilters";
import { Weapon } from "../types/weapon";

export const filterWeapons = (
    weapons: Weapon[],
    filters: WeaponFilterState,
    searchValue: string
) => {
    let weps = [...weapons];
    if (filters.weaponType.length > 0) {
        weps = weps.filter((wep) => filters.weaponType.includes(wep.type));
    }
    if (filters.rarity.length > 0) {
        weps = weps.filter((wep) => filters.rarity.includes(wep.rarity));
    }
    if (filters.substats.length > 0) {
        weps = weps.filter((wep) =>
            filters.substats.includes(wep.stats.subStat)
        );
    }
    if (filters.forgeryMat.length > 0) {
        weps = weps.filter((wep) =>
            filters.forgeryMat.includes(wep.materials.forgeryMat)
        );
    }
    if (filters.commonMat.length > 0) {
        weps = weps.filter((wep) =>
            filters.commonMat.includes(wep.materials.commonMat)
        );
    }
    if (searchValue !== "") {
        weps = weps.filter(
            (wep) =>
                wep.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                wep.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }
    return weps;
};
