import { Character } from "../types/character"
import { CharacterFilterState } from "../redux/reducers/CharacterFilterReducer"

export const filterCharacters = (characters: Character[], filters: CharacterFilterState, searchValue: string) => {
    let chars = [...characters]
    if (filters.element.length > 0) {
        chars = chars.filter(char => filters.element.includes(char.element))
    }
    if (filters.weapon.length > 0) {
        chars = chars.filter(char => filters.weapon.includes(char.weapon))
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter(char => filters.rarity.includes(char.rarity))
    }
    if (filters.tags.length > 0) {
        if (filters.uniqueTag) {
            chars = chars.filter(char => filters.tags.every((f: string) => char.tags.includes(f)))
        }
        else {
            chars = chars.filter(char => filters.tags.some((f: string) => char.tags.includes(f)))
        }
    }
    if (filters.forgeryMat.length > 0) {
        chars = chars.filter(char => filters.forgeryMat.includes(char.materials.forgeryMat as string))
    }
    if (filters.commonMat.length > 0) {
        chars = chars.filter(char => filters.commonMat.includes(char.materials.commonMat as string))
    }
    if (filters.ascensionMat.length > 0) {
        chars = chars.filter(char => filters.ascensionMat.includes(char.materials.ascensionMat as string))
    }
    if (filters.bossMat.length > 0) {
        chars = chars.filter(char => filters.bossMat.includes(char.materials.bossMat as string))
    }
    if (filters.weeklyBossMat.length > 0) {
        chars = chars.filter(char => filters.weeklyBossMat.includes(char.materials.weeklyBossMat as string))
    }
    if (searchValue !== "") {
        chars = chars.filter(char => char.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return chars
}