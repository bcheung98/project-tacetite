export const filterCharacters = (characters: any, filters: any, searchValue: string) => {
    let chars = [...characters]
    if (filters.element.length > 0) {
        chars = chars.filter(char => filters.element.includes(char.element))
    }
    return chars
}