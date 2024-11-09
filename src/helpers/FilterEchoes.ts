import { Echo } from "../types/echo"
import { EchoFilterState } from "../redux/reducers/EchoFilterReducer"

export const filterEchoes = (echoes: Echo[], filters: EchoFilterState, searchValue: string) => {
    let echos = [...echoes]
    if (filters.class.length > 0) {
        echos = echos.filter(echo => filters.class.includes(echo.class))
    }
    if (filters.sonata.length > 0) {
        if (filters.uniqueSonata) {
            echos = echos.filter(echo => filters.sonata.every((f: string) => echo.sonata.includes(f)))
        }
        else {
            echos = echos.filter(echo => filters.sonata.some((f: string) => echo.sonata.includes(f)))
        }
    }
    if (searchValue !== "") {
        echos = echos.filter(echo => echo.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return echos
}