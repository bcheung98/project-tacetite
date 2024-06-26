export const filterCharacters = (characters: any, filters: any, searchValue: string) => {
    let chars = [...characters]
    if (filters.element.length > 0) {
        chars = chars.filter(char => filters.element.includes(char.element))
    }
    if (filters.weapon.length > 0) {
        chars = chars.filter(char => filters.weapon.includes(char.weapon))
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter(char => filters.rarity.includes(char.rarity.toString()))
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
        chars = chars.filter(char => filters.forgeryMat.includes(char.materials.forgeryMat))
    }
    if (filters.commonMat.length > 0) {
        chars = chars.filter(char => filters.commonMat.includes(char.materials.commonMat))
    }
    if (filters.ascensionMat.length > 0) {
        chars = chars.filter(char => filters.ascensionMat.includes(char.materials.ascensionMat))
    }
    if (filters.bossMat.length > 0) {
        chars = chars.filter(char => filters.bossMat.includes(char.materials.bossMat))
    }
    if (filters.weeklyBossMat.length > 0) {
        chars = chars.filter(char => filters.weeklyBossMat.includes(char.materials.weeklyBossMat))
    }
    if (searchValue !== "") {
        chars = chars.filter(char => char.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return chars
}