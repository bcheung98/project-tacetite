export const filterEchoes = (echoes: any, filters: any, searchValue: string) => {
    let echos = [...echoes]
    if (filters.class.length > 0) {
        echos = echos.filter(echo => filters.class.includes(echo.class))
    }
    if (filters.sonata.length > 0) {
        echos = echos.filter(echo => filters.sonata.some((f: string) => echo.sonata.includes(f)))
    }
    if (searchValue !== "") {
        echos = echos.filter(echo => echo.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return echos
}